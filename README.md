# CollisionViz
Interact with CollisionViz [here](https://davidfeng.us/CollisionViz) or [here](https://davidfeng88.github.io/CollisionViz).

CollisionViz shows the location and time of motor vehicle collisions in New York City. It is built with React.js and Redux. It uses [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) and [NYPD Motor Vehicle Collisions API](https://dev.socrata.com/foundry/data.cityofnewyork.us/qiz3-axqb).

![play_demo](assets/images/play_demo.gif)

## Features
The user can select the date and the start time of the visualization.

The current map time and collisions' time range are shown.

The user can click on map icons to see the collision details (shown in [Info Windows](https://developers.google.com/maps/documentation/javascript/infowindows)). Only columns with non-zero values are shown.

More settings and more map options are also available.

### Icon Settings
The user can choose to show custom icons for collisions involving taxis, bicycles, motorcycles, and collisions that caused pedestrian injuries or deaths.

**Note**: this does not change the icons that are already on the map. Also, the icons have priorities as taxi > bicycle > motorcycle > pedestrian (e.g. if a taxi hit a bicycle, the icon would be a taxi).

### Map Layers
The user can toggle four layers on and off the map. By default, the heat map layer is turned on while the other three are turned off.
* The heat map layer shows a heat map based on all the collisions on the date selected.
* The traffic layer shows the real-time (user time) traffic information.
* The transit layer displays the public transit network.
* The bicycling Layer renders bike paths, suggested bike routes and other overlays specific to bicycling usage.

## Implementation
### Sample Redux State
```javascript
{
  filters: {
    start: 420,
    finish: 420,
    date: "2017-07-15",
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
- `collisions` contains all the collisions of the selected day. The reducer organizes the collisions into arrays based on their time.
- `filters` contains filters for the collisions. The start time and finish time are integers representing the minutes from midnight. So 7:00AM would be 420 ( = 60 minutes * 7).

### The Control Panel
```javascript
case 'date':
  this.handleReset();
  this.props.updateFilter({ date: e.currentTarget.value });
  this.setState({
    date: e.currentTarget.value,
    loaded: false,
  });
  if (e.currentTarget.value !== "") {
    this.props.fetchCollisions(e.currentTarget.value)
      .then(
        () => this.setState({loaded: true})
      );
  }
```
After the user selects a new date, first, it would stop any current visualization and reset the time to 7:00AM. Then it would update the `date` in the `filters` of the Redux state and in the local state. Also it would set `loaded` to be false (which disables the play button and shows the loading spinner). Then [the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) will fetch data from the source and populate the `collisions` slice of Redux state. Using a promise, after all these work is done, it sets `loaded` to be true.

To start the visualization, the `handlePlay` function uses the `setInterval` function to call `oneStepForward` repeatedly, which updates the start and finish time in the `filters` of the Redux state.

The `handleStop` function calls the `clearInterval` function to stop the visualization.

### The Map
If it receives a new date from the Redux state, it would remove the heatmap layer, remove all the markers on the map, and finally it would Fetch the collision data from the data source to build the heatmap.

During the visualization, the map container calculates the arrays of collisions to add/remove based on the updated start  and finish time in the `filters` and the `collisions` slice of the Redux state. These arrays are then sent to the `marker_manager`, which updates the markers on the map.

[Custom markers](https://developers.google.com/maps/documentation/javascript/custom-markers), [heatmap](https://developers.google.com/maps/documentation/javascript/heatmaplayer), and [traffic, transit and bicycling layer](https://developers.google.com/maps/documentation/javascript/trafficlayer) are created using the Google Maps JavaScript API.

## Future Directions
### Better layout
Reorganize the "more setting" and "more map options" panels (and maybe use CSS grid) so that they stick right to the main part of the app.

### Incorporate other tools
* [MarkerClusterers](https://developers.google.com/maps/documentation/javascript/marker-clustering)
*
[Google Charts](https://developers.google.com/chart/) for data analysis (for example, compare time/location distributions of collisions between weekday vs. weekend, winter vs. summer, rainy vs. sunny, etc.)
