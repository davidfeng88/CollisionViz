# CollisionViz
Interact with CollisionViz [here](https://davidfeng.us/CollisionViz) or [here](https://davidfeng88.github.io/CollisionViz).

CollisionViz shows the location and time of motor vehicle collisions in New York City. It is built with React.js, Redux, and SASS. It uses [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) and [NYPD Motor Vehicle Collisions API](https://dev.socrata.com/foundry/data.cityofnewyork.us/qiz3-axqb).

![demo](assets/images/demo.gif)

## Instructions
1. Select the date. A heatmap of all the collisions on that day will be displayed. Select the start time of the visualization.
2. Play/pause the visualization. Map markers representing collisions will appear and disappear on the map. Click on markers for collision details.
3. More settings and more map options are also available.

## Features
### For A More Intuitive User Experience
* Use HTML5 inputs types: `date` and `time`.
* Disable (grey out) some settings during visualization.
* Use the same place to show the [loading spinner](https://loading.io/), the play button, and the pause button.
* Replace default checkboxes with [toggle switches](https://www.w3schools.com/howto/howto_css_switch.asp).
* Animate the `enter` and `leave` of `more settings` and `map options`.

### Map Options
* [Custom markers](https://developers.google.com/maps/documentation/javascript/custom-markers) show collisions involving taxis, bicycles, motorcycles, and collisions that caused pedestrian injuries or deaths.
* [Info window](https://developers.google.com/maps/documentation/javascript/infowindows) shows the details of a collision. Entries with "0" values are hidden.
* [heatmap](https://developers.google.com/maps/documentation/javascript/heatmaplayer) shows a heatmap based on all the collisions on the selected date. **Note**: at this zoom level, all heatmap data will dissipate with Fusion Table Layer, thus a Heatmap Layer is used.
* [traffic, transit and bicycling Layers](https://developers.google.com/maps/documentation/javascript/trafficlayer) show the real-time (user time) traffic, the public transit network, and bike paths, respectively.
* Alternative Map Style is the Silver theme in [Google Maps APIs Styling Wizard](https://mapstyle.withgoogle.com/)
Style.

## Implementation
### Sample Redux State
```javascript
{   start: 420,
    finish: 420,
    date: "2017-07-15",
  }
  ```


  ```javascript
  ,
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
      },
      ...
    ],
    "0:05": [
      ...
    ],
    ...
  }
}
```

- `filters` contains filters for the collisions. The start time and finish time are integers representing the minutes after the midnight. So 7:00 AM would be 420 ( = 60 minutes * 7).

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
After the user selects a new date, first, it stops any current visualization and reset the time to 7:00 AM. Then it updates the `date` in the `filters` of the Redux state and in the local state. Also, it sets `loaded` to be false (which disables the play button and shows the loading spinner). Then [the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) will fetch data from the source and populate the `collisions` slice of Redux state. Using a promise, after all these work is done, it sets `loaded` to be true.

To start the visualization, the `handlePlay` function uses the `setInterval` function to call `oneStepForward` repeatedly, which updates the start and finish time in the `filters` of the Redux state.

The `handleStop` function calls the `clearInterval` function to stop the visualization.

### The Map
If it receives a new date from the Redux state, it removes the heatmap layer, removes all the markers on the map, and fetches the collision data to build a new heatmap.

During the visualization, the map container calculates the arrays of collisions to be added/removed based on the updated start and finish time in the `filters` and `collisions` of the Redux state. These arrays are then sent to the `marker_manager`, which updates the markers on the map.

## Future Directions
* Incorporate [MarkerClusterers](https://developers.google.com/maps/documentation/javascript/marker-clustering)
* Incorporate [Google Charts](https://developers.google.com/chart/) ([w3school tutorial](https://www.w3schools.com/howto/howto_google_charts.asp)) for data analysis. For example, compare time/location distributions of collisions between weekday vs. weekend, winter vs. summer, rainy vs. sunny, etc.
