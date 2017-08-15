# CollisionViz
Interact with CollisionViz [here](https://davidfeng.us/CollisionViz) or [here](https://davidfeng88.github.io/CollisionViz).

CollisionViz shows the location and time of motor vehicle collisions in New York City. It is built with React.js and Redux. It uses [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) and [NYPD Motor Vehicle Collisions API](https://dev.socrata.com/foundry/data.cityofnewyork.us/qiz3-axqb).

![play_demo](assets/images/play_demo.gif)

## Features

The user can select the date and the start time of the visualization.

The current map time and collisions' time range are shown.

The user can click on map icons to see the collision details (shown in [Info Windows](https://developers.google.com/maps/documentation/javascript/infowindows)). Only columns with non-zero values are shown.

More settings and more map options are also available.

### Icon settings
The user can choose to show custom icons for collisions involving taxis, bicycles, motorcycles, and collisions that caused pedestrian injuries or deaths.

**Note**: this does not change the icons that are already on the map. Also, the icons have priorities as taxi > bicycle > motorcycle > pedestrian (e.g. if a taxi hit a bicycle, the icon would be a taxi).

### Map layers

The user can toggle four layers on and off the map. By default, the heat map layer is turned on while the other three are turned off.
* The heat map layer shows a heat map based on all the collisions on the date selected.
* The traffic layer shows the real-time (user time) traffic information.
* The transit layer displays the public transit network.
* The bicycling Layer renders bike paths, suggested bike routes and other overlays specific to bicycling usage.

## Implementation
### Sample Redux state
```javascript
{
  filters: {
    start: 420,
    finish: 420,
    loaded: true,
  },
  collisions: {
    "0:00": [
      {
        contributing_factor_vehicle_1: "Driver Inattention/Distraction",
        contributing_factor_vehicle_2: "Unspecified",
        ...
      },
      {
        borough: "BROOKLYN",
        contributing_factor_vehicle_1: "Outside Car Distraction",
        contributing_factor_vehicle_2: "Unspecified",
        ...
      }
    ],
      borough: "Brooklyn",
      contributing_factor_vehicle_1: "Unspecified",
      contributing_factor_vehicle_2: "Unspecified",
    },
    "0:05": [
      ...
    ],
    ...
  }
}
```
The state contains two slices:
- `collisions` contains all the collisions of the selected day. The information was obtained by the Fetch API and it returns an array of all the collisions. The reducer organizes the collisions into arrays based on their time.
- `filters` contains filters (start time and finish time) for the collisions. They are set by the control panel and rendered by the map information box.


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
