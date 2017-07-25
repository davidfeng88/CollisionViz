# CollisionViz
Interact with CollisionViz [here](https://collisionviz.davidfeng.us/) or [here](https://collisionviz.herokuapp.com/).

CollisionViz shows the location and time of motor vehicle collisions in New York City on 6/22/2017 (Friday). It uses Ruby on Rails, a PostgreSQL database, React.js, Redux, and Google Maps JavaScript API. Collision data are from NYPD.

![play_demo](play_demo.gif)

## Features
### Control panel
The user can select the start time of the visualization, how long a collision stays on the map, and the time lapse rate. The "Reset" button resets these settings to the default.

The user can start/pause/resume the visualization. The user can also step one minute (map time) forward/backward. The optional background traffic sound can be turned on and off.

The user can choose to show special icons for collisions involving taxis, bicycles, motorcycles, and pedestrians.

**Note**: this does not change the icons that are already on the map. Also, the icons have priorities as taxi > bicycle > motorcycle > pedestrian (e.g. if a taxi hit a bicycle, the icon would be a taxi).

### Map
During the visualization, markers representing collisions appear on the embedded Google Map at the corresponding time recorded in the NYPD database. The current map time and the number of collisions on the map are updated simultaneously. **Note**: the number of collisions on the round clock (e.g. 13:00) may be overrated.

The user can toggle four layers on and off the map. The heat map layer shows a heat map based on all the collisions on 6/22/2017. One injury is counted as five normal collisions (where nobody was injured or killed). One death is counted as 100 normal collisions (fortunately the number of deaths is 0 on that day). The traffic layer shows the real-time (user time) traffic information. The transit layer displays the public transit network. The bicycling Layer renders bike paths, suggested bike routes and other overlays specific to bicycling usage. By default, the heat map layer is turned on while the other three are turned off.

### Collision details
When the user clicks on the marker on the map, a box containing details of the collision appears.
The `id` column and columns with `null` or `0` values are not shown.

Data in the `Time` column is of `datetime` type and are in [Coordinated Universal Time (UTC)](https://www.wikiwand.com/en/Coordinated_Universal_Time). The local time in New York City is UTC-04:00 (with daylight saving time).

## Implementation

### Data import
The [NYPD data][data_link] come in a CSV file. The entries were imported to a PostgreSQL database using Active Record.

[data_link]: https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95

### Filtering the collisions
The internal state of `ControlPanel` component contains a field for `currentTime`. `oneStepForward` function increases `currentTime` by one minute, calculates the `start` and `finish` options (with `collisionMapTime`, which is set by the user), and updates the `collisions` slice of the Redux state with collisions which happened in the new time range. The map then renders markers for the collisions.

Several edge cases are also handled. For example, when the visualization just started, collisions happened before the start time should not be shown.

The `handlePlay` function uses the `setInterval` function to call `oneStepForward` repeatedly. The delay time is set by the user. The `handleStop` function calls the `clearInterval` function.

### Map
The `marker_manager` updates markers on the map based on the collisions in the Redux state. Markers have `onClick` listeners, which dispatches an action to update the `highlight` slice of the state.

The `MapInfo` component receives `start` and `finish` time from the `options` slice of the state and renders them.

[Custom markers](https://developers.google.com/maps/documentation/javascript/custom-markers), [heatmap](https://developers.google.com/maps/documentation/javascript/heatmaplayer), and [traffic, transit and bicycling layer](https://developers.google.com/maps/documentation/javascript/trafficlayer) are created using the Google Maps JavaScript API.

### Collision details
The `Highlight` component will render if the `highlight` slice of the state is not `null`. To make the component persist even after the corresponding marker disappears from the map, I created a separate `highlight` slice to hold the information of this collision, instead of using the information already in the `collisions` slice.

## Future Directions

### Collision filter by map borders
Resize/move the map eliminates the collisions that are outside of the map border.

### Show collisions in multiple days
Include collision data from multiple days and allow the user to select the date. Compare time/location distributions of collisions between different days (e.g. weekday vs. weekend, winter vs. summer, rainy vs. sunny, etc.).

### Incorporate other tools
* [Fusion Tables](https://developers.google.com/maps/documentation/javascript/fusiontableslayer): to handle [heat map](https://developers.google.com/maps/documentation/javascript/heatmaplayer) and collision data.

* [Google BigQuery](https://cloud.google.com/bigquery/public-data/nypd-mv-collisions): to enhance scalability.

* [Firebase](https://firebase.google.com/): to host collision data.
