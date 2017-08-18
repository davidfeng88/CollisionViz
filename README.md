# CollisionViz
[Live](https://davidfeng.us/CollisionViz)

CollisionViz shows the location and time of motor vehicle collisions in New York City. It is built with React.js, Redux, SASS, [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) and [NYPD Motor Vehicle Collisions API](https://dev.socrata.com/foundry/data.cityofnewyork.us/qiz3-axqb).

![demo](assets/images/demo.gif)

## Instructions
1. Select the date. A heatmap of all the collisions on that day will be displayed. Select the start time of the visualization. More settings and more map options are also available.
2. Play/pause the visualization. Map markers representing collisions will appear and disappear on the map. Click on markers for collision details.

## Features
### For A More Intuitive User Experience
* HTML5 inputs types (`date` and `time`)
* Disabled settings during visualization
* Same place for [the loading spinner](https://loading.io/), the play button, and the pause button
* [Toggle switches](https://www.w3schools.com/howto/howto_css_switch.asp) instead of default checkbox type inputs
* Animations of the `enter`/`leave` of `more settings` and `map options`

### From Google Maps JavaScript API
* [Info window](https://developers.google.com/maps/documentation/javascript/infowindows) shows the details of a collision. Entries with "0" values are hidden.
* [Custom markers](https://developers.google.com/maps/documentation/javascript/custom-markers) show collisions involving taxis, bicycles, motorcycles, and collisions that caused pedestrian injuries or deaths.
* [Heatmap layer](https://developers.google.com/maps/documentation/javascript/heatmaplayer) shows a heatmap based on all the collisions on the selected date. **Note**: at this zoom level, all heatmap data will dissipate with fusion table layer, thus a heatmap layer is used.
* [Traffic, transit and bicycling Layers](https://developers.google.com/maps/documentation/javascript/trafficlayer) show the real-time (user time) traffic, the public transit network, and bike paths, respectively.
* Alternative map style is the Silver theme in [Google Maps APIs Styling Wizard](https://mapstyle.withgoogle.com/).

## Implementation
### Sample Redux State
```javascript
{
  // Need to show collisions happened between the start time and the finish time on the map. Start time and finish time are in minutes, counting from the midnight.
  start: 480, // 8:00
  finish: 490, // 8:10

  date: "2017-04-15",
  loaded: false,
}
```
The `start`, `finish`, and `date` fields are updated by the `control panel` component and used by the `map` component. The `loaded` field is updated by both components, and used by the `control panel`.

### When a new date is selected
1. `Control panel` updates the `date` field and sets the `loaded` to be false, which makes `control panel` render the loading spinner.
2. `Map` removes the current heatmap and all the markers on the map. Then it fetches collision information from the data source using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
3. Using a promise, after the fetch finishes, the returned data, an array of collisions, is first filtered. Collisions without time and location values are discarded. Then the filtered data are stored in an object, with times of the collisions as the keys, and arrays of collisions as the values. Note that the keys (time) are converted to numbers of minutes from midnight. `Map` also builds a new heatmap based on the collision data.
```javascript
this.collisions = {
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
4. `Map` updates the `loaded` to be true, and then the control panel replaces the loading spinner with the play button.

### When a new time is selected
`Control panel` updates its `initialTime` instance variable and the `start` and `finish` fields in the Redux state.

### When the play button is pressed
1. `Control panel` uses the `step` function to update the `start` and `finish` time in the Redux state: move them forward by one minute. It also handles several edge cases.
```javascript
step() {
  let newTime = this.props.finish + 1;
  // Edge case 1: Stop the visualization if newTime is 0:00 the next day
  if (newTime > END_TIME) {
    this.handleStop();
  } else {
    let start = newTime - this.state.collisionMapTime;
    let finish = newTime;
    // Edge case 2: the start time should not be earlier than the initialTime
    start = start < this.initialTime ? this.initialTime : start;
    // Edge case 3: the start time should not be earlier than 0:00
    start = start < START_TIME ? START_TIME : start;
    this.props.updateFilter({
      start,
      finish,
    });
  }
}
```
2. To start the visualization, `control panel` uses `setInterval` to call `step` repeatedly. Correspondingly, it calls `clearInterval` to stop the visualization. If the user clicks on the play button again, the visualization will resume from the `finish` time, i.e. when the visualization was stopped/paused.
3. `Map` receives the new `start` time and `finish` time, and it selected collisions happened in the time range.
```javascript
let collisionsArray = [];
for (let time = start; time <= finish; time++) {
  if (collisions[time]) {
    collisionsArray = collisionsArray.concat(collisions[time]);
  }
}
```
4. The `collisionsArray` is sent to the `MarkerManager`, which updates the markers on the map. To facilitate this process, objects are created, and arrays `filter` and `forEach` functions are used. See the details below.
```javascript
updateMarkers(collisionsArray, taxi, bike, motorcycle, ped) {
  // create an object for current collisions
  const collisionsObj = {};
  collisionsArray.forEach(
    collision => {collisionsObj[collision.unique_key] = collision;});
  /*
    new markers are created for new collisions
    this.markersObj is an object with markers as values
    Pattern:
    array.filter( element => !object[key])
    .forEach( collision => create/delete marker);
  */
  collisionsArray
    .filter(collision => !this.markersObj[collision.unique_key])
    .forEach(newCollision => {
      this.createMarker(newCollision, taxi, bike, motorcycle, ped);
    });
  // Old markers for collisions that are not in the `collisionsArray` are removed.
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
