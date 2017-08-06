# CollisionViz
Interact with CollisionViz [here](https://collisionviz.davidfeng.us/) or [here](https://collisionviz.herokuapp.com/).

CollisionViz shows the location and time of motor vehicle collisions in New York City on 6/22/2017 (Friday). It uses Ruby on Rails, a PostgreSQL database, React.js, Redux, and Google Maps JavaScript API. Collision data are from NYPD.

![play_demo](docs/play_demo.gif)

## Features

The user can select the start time and start/pause/resume the visualization.

The current map time and time range of collisions are shown.

The user can click on map icons to see the collision details (shown in [Info Windows](https://developers.google.com/maps/documentation/javascript/infowindows)).

More settings and more map options are also available.

### Icon settings
The user can choose to show custom icons for collisions involving taxis, bicycles, motorcycles, and collisions that caused pedestrian injuries or deaths.

**Note**: this does not change the icons that are already on the map. Also, the icons have priorities as taxi > bicycle > motorcycle > pedestrian (e.g. if a taxi hit a bicycle, the icon would be a taxi).

### Map layers

Map panel: the user can toggle four layers on and off the map. By default, the heat map layer is turned on while the other three are turned off.
* The heat map layer shows a heat map based on all the collisions on 6/22/2017. One injury is counted as five normal collisions (where nobody was injured or killed). One death is counted as 100 normal collisions (fortunately the number of deaths is 0 on that day).
* The traffic layer shows the real-time (user time) traffic information.
* The transit layer displays the public transit network.
* The bicycling Layer renders bike paths, suggested bike routes and other overlays specific to bicycling usage.

### Collision details

* The `id` column and columns with `null` or `0` values are not shown.
* Data in the `Time` column is of `datetime` type and are in [Coordinated Universal Time (UTC)](https://www.wikiwand.com/en/Coordinated_Universal_Time). The local time in New York City is UTC-04:00 (with daylight saving time).

## Implementation
### Sample Redux state
```javascript
{
  filters: {
    start: 420,
    finish: 420,
  },
  collisions: {
    59: {
      borough: "Brooklyn",
      contributing_factor_vehicle_1: "Unspecified",
      contributing_factor_vehicle_2: "Unspecified",
    },
    60: {
      ...
    }
    ...
  }
}
```
The state contains three slices:
- `filters` contains filters (start time and finish time) for the collisions. They are set by the control panel and rendered by the map information box. Whenever a filter is updated, an AJAX request is sent to the backend with the filter, and collisions that meet those conditions are populated in the `collisions` slice.
- `collisions` contains all the collisions that meet the filter conditions. It is set by the filters and rendered by the map component.

### Filtering the collisions
The internal state of `ControlPanel` component contains a field for `currentTime`. `oneStepForward` function increases `currentTime` by one minute, calculates the `start` and `finish` filters, and updates the `collisions` state slice. Several edge cases are also handled. For example, when the visualization just started, collisions happened before the start time should not be shown.

The `handlePlay` function uses the `setInterval` function to call `oneStepForward` repeatedly. The delay time is set by the user. The `handleStop` function calls the `clearInterval` function.

### Map
The `marker_manager` updates markers on the map based on the `collisions` state slice.

[Custom markers](https://developers.google.com/maps/documentation/javascript/custom-markers), [heatmap](https://developers.google.com/maps/documentation/javascript/heatmaplayer), and [traffic, transit and bicycling layer](https://developers.google.com/maps/documentation/javascript/trafficlayer) are created using the Google Maps JavaScript API.

### Data import
The [NYPD data][data_link] come in a CSV file. The entries were imported to a PostgreSQL database using Active Record.

[data_link]: https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95

## Future Directions

### Show collisions in multiple days
Include collision data from multiple days and allow the user to select the date. Compare time/location distributions of collisions between different days (e.g. weekday vs. weekend, winter vs. summer, rainy vs. sunny, etc.).

### Incorporate other tools
* Use [fusion Tables](https://developers.google.com/maps/documentation/javascript/fusiontableslayer) to handle [heat map](https://developers.google.com/maps/documentation/javascript/heatmaplayer) and collision data.
* Use [Google BigQuery](https://cloud.google.com/bigquery/public-data/nypd-mv-collisions) to enhance scalability.
* Use [Firebase](https://firebase.google.com/) to host collision data.
