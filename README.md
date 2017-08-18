# CollisionViz
[Live](https://davidfeng.us/CollisionViz)

CollisionViz is a data visualization web app for motor vehicle collisions in New York City. It is built with React.js, Redux, SASS, [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) and [NYPD Motor Vehicle Collisions API](https://dev.socrata.com/foundry/data.cityofnewyork.us/qiz3-axqb).

![demo](assets/images/demo.gif)

## Instructions
1. Select the date. A heatmap of all the collisions on that day will be displayed. Select the start time of the visualization. More settings and map options are also available.
2. Start/pause the visualization. Markers representing collisions will appear and disappear on the map. Click on markers for collision details.

## Features
### For A More Intuitive User Experience
* HTML5 inputs types (`date` and `time`)
* Disabled settings during visualization
* Same place for [the loading spinner](https://loading.io/), the start button, and the pause button
* [Toggle switches](https://www.w3schools.com/howto/howto_css_switch.asp) instead of default checkbox type inputs
* Animations of the `enter`/`leave` of `more settings` and `map options`

### From Google Maps JavaScript API
* [Info window](https://developers.google.com/maps/documentation/javascript/infowindows) shows the details of a collision. Entries with "0" values are hidden.
* [Custom markers](https://developers.google.com/maps/documentation/javascript/custom-markers) show collisions involving taxis, bicycles, motorcycles, and collisions that caused pedestrian injuries or deaths.
* [Heatmap layer](https://developers.google.com/maps/documentation/javascript/heatmaplayer) shows a heatmap based on all the collisions on the selected date. **Note**: fusion table layer does not work because all heatmap data will dissipate at this zoom level.
* [Traffic, transit and bicycling Layers](https://developers.google.com/maps/documentation/javascript/trafficlayer) show the real-time (user time, not map time) traffic, the public transit network, and bike paths, respectively.
* Alternative map style is the Silver theme in [Google Maps APIs Styling Wizard](https://mapstyle.withgoogle.com/).

## Implementation
### Sample Redux State
```javascript
{
  /*
    Need to show collisions happened between the start time and the finish time
    Start time and finish time are in minutes, counting from the midnight
  */
  start: 480,   // 08:00
  finish: 490,  // 08:10
  date: "2017-04-15",
  loaded: false,
}
```
The `start`, `finish`, and `date` fields are updated by the `control panel` component and used by the `map` component. The `loaded` field is updated by both components, and used by `control panel`.

### When a new date is selected
1. `Control panel` updates `date` and sets `loaded` to be false, which makes `control panel` render the loading spinner.
2. `Map` removes all the markers and the heatmap from the map. Then it fetches collision information from the data source using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
3. Using [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), after the fetch finishes, the returned data (an array of collisions) is filtered. Collisions without time and location entries are discarded. `Map` builds a new heatmap based on the filtered data. The filtered data are also reorganized and stored in an object.
```javascript
this.collisions = {
    /*
      key: collision's time, in the form of number of minutes from the midnight
      value: array of collisions
    */
    0: [
      {
        contributing_factor_vehicle_1: "Driver Inattention/Distraction",
        contributing_factor_vehicle_2: "Unspecified",
        time: "0:00",
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
    5: [
      ...
    ],
    ...
  }
}
```
4. `Map` sets `loaded` to be true, and then `control panel` replaces the loading spinner with the start button.

### When a new time is selected
`Control panel` updates its `initialTime` instance variable and `start` and `finish` in the Redux state.

### When the start button is pressed
1. `Control panel` uses the `step` function to increase `start` and `finish` in the Redux state by 1. It also handles several edge cases.
```javascript
const START_TIME = 0;   // 00:00
const END_TIME = 1439;  // 23:59

step() {
  let newTime = this.props.finish + 1;
  // Edge case 1: Stop the visualization if newTime is later than 23:59
  if (newTime > END_TIME) {
    this.handleStop();
  } else {
    let start = newTime - this.state.collisionMapTime;
    let finish = newTime;
    // Edge case 2: the start time should not be earlier than the initialTime
    start = start > this.initialTime ? start : this.initialTime;
    // Edge case 3: the start time should not be earlier than 00:00
    start = start > START_TIME ? start : START_TIME;
    this.props.updateFilter({
      start,
      finish,
    });
  }
}
```
2. To start the visualization, `control panel` uses `setInterval` to call `step` repeatedly. Correspondingly, it calls `clearInterval` to pause the visualization. If the user clicks on the start button again, the visualization will resume from the previous `finish`, when the visualization was paused.
3. `Map` receives the new `start` and `finish`, and it selects collisions happened in the time range.
```javascript
let collisionsArray = [];
for (let time = start; time <= finish; time++) {
  /*
    collisions:
      key: collision's time, in the form of number of minutes from the midnight
      value: array of collisions
    if collisions[time] is undefined, then no collisions happened on that time
  */
  if (collisions[time]) {
    collisionsArray = collisionsArray.concat(collisions[time]);
  }
}
```
4. The `collisionsArray` is sent to the `MarkerManager`, which updates the markers on the map. To facilitate this process, objects are created, and array's `filter` and `forEach` functions are used.
```javascript
updateMarkers(collisionsArray, taxi, bike, motorcycle, ped) {
  // create an object for current collisions
  const collisionsObj = {};
  collisionsArray.forEach(
    collision => {collisionsObj[collision.unique_key] = collision;});
  /*
    Pattern:
      array.filter(element => !object[key])
      .forEach(collision => create/delete marker);

    1. New markers are created for new collisions
    this.markersObj is an object with markers as values
  */
  collisionsArray
    .filter(collision => !this.markersObj[collision.unique_key])
    .forEach(newCollision => {
      this.createMarker(newCollision, taxi, bike, motorcycle, ped);
    });
  // 2. Old markers for collisions that are not in the `collisionsArray` are removed
  Object.keys(this.markersObj)
    .filter(collisionUniqueKey => !collisionsObj[collisionUniqueKey])
    .forEach(collisionUniqueKey => {
      this.removeMarker(this.markersObj[collisionUniqueKey]);
    });
}
```

## Future Directions
* Incorporate [MarkerClusterers](https://developers.google.com/maps/documentation/javascript/marker-clustering)
* Incorporate [Google Charts](https://developers.google.com/chart/) ([w3school tutorial](https://www.w3schools.com/howto/howto_google_charts.asp)) for data analysis. For example, compare time/location distributions of collisions between weekday vs. weekend, winter vs. summer, rainy vs. sunny, etc.
