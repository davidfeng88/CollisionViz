# CollisionViz
[Live](https://davidfeng.us/CollisionViz)

CollisionViz is a data visualization web app for motor vehicle collisions in New York City. It is built with React.js, Redux, SASS, [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/), [Google Charts](https://developers.google.com/chart/), and [NYPD Motor Vehicle Collisions API](https://dev.socrata.com/foundry/data.cityofnewyork.us/qiz3-axqb).

![demo](assets/images/demo.gif)

## Instructions
1. Select the date. A collision heatmap and a time distribution chart of all the collisions on that day will show up.
2. Select the start time of the visualization by using the input box or clicking on the chart bars.
3. Start/pause the visualization. Markers representing collisions will show up on the map. Click on markers for collision details.

## Features
### For A More Intuitive User Experience
* HTML5 inputs types (`date`, `time`, and `range`)
* Disabled settings during visualization
* Animations of the `enter`/`leave` of `chart`, `more settings`, and `map options`
* Same place for [the loading spinner](https://loading.io/), the start button, and the pause button
* [Toggle switches](https://www.w3schools.com/howto/howto_css_switch.asp) instead of default checkbox type inputs
* The [column chart](https://developers.google.com/chart/interactive/docs/gallery/columnchart) shows the number of collisions in each hour, in three categories: without any injuries/deaths, with injuries but no deaths, and with deaths. Hovering on chart bars shows the statistics, and clicking on them changes the map time.

### From Google Maps JavaScript API
* [Info window](https://developers.google.com/maps/documentation/javascript/infowindows) shows the details of a collision. Entries with '0' values are hidden.
* [Custom markers](https://developers.google.com/maps/documentation/javascript/custom-markers) show collisions involving taxis, bicycles, motorcycles, and collisions that caused pedestrian injuries or deaths.
* A [marker clusterer](https://developers.google.com/maps/documentation/javascript/marker-clustering) with a number label will replace original markers if a few markers are too close to each other. Clicking on the clusterer will zoom the map in, and individual markers will show up.
* [Heatmap layer](https://developers.google.com/maps/documentation/javascript/heatmaplayer) shows a heatmap based on all the collisions of the selected date.
* [Traffic, transit and bicycling Layers](https://developers.google.com/maps/documentation/javascript/trafficlayer) show the real-time (wall time, not map time) traffic, the public transit network, and bike paths, respectively.
* Alternative map style is the Silver theme from [Google Maps APIs Styling Wizard](https://mapstyle.withgoogle.com/).

## Implementation
### Sample Redux State
```javascript
{
  /**
   * Need to show collisions happened between the start time and the finish time.
   * Start, finish and initialTime are in minutes, counting from the midnight.
   */
  start: 480,         // 08:00
  finish: 490,        // 08:10
  initialTime: 480,   // 08:00
  date: '2017-03-13',
  loaded: false,
}
```
### When a new date is selected
1. `Control panel` updates `date` and sets `loaded` to be false, which makes `control panel` render the loading spinner.
2. `Map` removes all the markers and the heatmap from the map. Then it fetches collision information from the data source using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
3. Using [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), after the fetch finishes, the returned data (an array of collisions) is filtered. Collisions without time and location entries are discarded. `Map` builds a new heatmap and a new chart based on the filtered data. The filtered data are also reorganized and stored in an object.
```javascript
// In the map component, fetchCollisions method.
this.collisions = {
    /**
     * Key: collision's time, in the form of the number of minutes from the midnight.
     * Value: an array of collisions.
     */
    0: [
      {
        contributing_factor_vehicle_1: 'Driver Inattention/Distraction',
        contributing_factor_vehicle_2: 'Unspecified',
        time: '0:00',
        ...
      },
      {
        borough: 'BROOKLYN',
        contributing_factor_vehicle_1: 'Outside Car Distraction',
        contributing_factor_vehicle_2: 'Unspecified',
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
4. `Map` sets `loaded` to be true, then `control panel` replaces the loading spinner with the start button.

### When a new time is selected
`Control panel` (the input box) or `map` (clicking on chart bars) updates `start`, `finish`, `initialTime` in the Redux state. `Map Info` and markers are updated.

### When the start button is pressed
1. `Control panel` uses the `step` function to increase `start` and `finish` in the Redux state by 1. It also handles several edge cases.
```javascript
// In the control panel component
const START_TIME = 0;   // 00:00
const END_TIME = 1439;  // 23:59

step() {
  let newTime = this.props.finish + 1;
  // Edge case 1: Stop the visualization if newTime is later than 23:59.
  if (newTime > END_TIME) {
    this.handleStop();
  } else {
    let start = newTime - this.state.collisionMapTime + 1;
    let finish = newTime;
    // Edge case 2: the start time should not be earlier than the initialTime.
    start = start > this.props.initialTime ? start : this.props.initialTime;
    // Edge case 3: the start time should not be earlier than 00:00.
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
// In the map component, updateMarkers method
let collisionsArray = [];
for (let time = start; time <= finish; time++) {
  /**
   * Collisions:
   *   Key: collision's time, in the form of the number of minutes from the midnight.
   *   Value: an array of collisions.
   * If collisions[time] is undefined, then no collisions happened on that time.
   */
  if (time in this.collisions) {
    collisionsArray = collisionsArray.concat(this.collisions[time]);
  }
}
```
4. The `collisionsArray` is sent to the `MarkerManager`, which updates the markers on the map. To facilitate this process, objects are created, and array's `filter` and `forEach` functions are used.
```javascript
// In marker_manager.js
updateMarkers(collisionsArray, taxi, bike, motorcycle, ped, useMC) {
 /**
  * Create an object for current collisions.
  *   Key: collision.unique_key
  *   Value: collision
  */
  const collisionsObj = {};
  collisionsArray.forEach(
    collision => {collisionsObj[collision.unique_key] = collision;});
  /**
   * Pattern:
   * array.filter(element => !object[key])
   *  .forEach(collision => create/remove marker);
   *
   * 1. New markers are created for new collisions.
   * this.markersObj is an object with
   *   Key: collision.unique_key
   *   Value: the marker of the collision
   * Thus if this.markersObj[collision.unique_key] is undefined,
   * then this collision does not have a marker, so we need to create one.
   */
  collisionsArray
    .filter(collision => !this.markersObj[collision.unique_key])
    .forEach(newCollision => {
      this.createMarker(newCollision, taxi, bike, motorcycle, ped, useMC);
    });
  /**
   * 2. Old markers for collisions that are not in the `collisionsArray` are removed.
   * If collisionsObj[collisionUniqueKey] is undefined,
   * then this collision has a marker, but it needs to be removed.
   */
  Object.keys(this.markersObj)
    .filter(collisionUniqueKey => !collisionsObj[collisionUniqueKey])
    .forEach(collisionUniqueKey => {
      this.removeMarker(this.markersObj[collisionUniqueKey], useMC);
    });
}
```
5. About marker clusterer: A `MarkerClusterer` instance is created in the `MarkerManager` constructor, which takes an empty array of markers as an argument. `MarkerManager` has a `updateMC` method, which is called when user toggle the "Marker Clusterer" switch.
```javascript
// In marker_manager.js
updateMC(useMC) {
  if (useMC) {
    /**
     * Convert current markers to marker clusterers:
     *   Put all the current markers into an array and add the array to
     *   the MarkerClusterer.
     */
    let markersArray = Object.values(this.markersObj);
    this.MarkerClusterer.addMarkers(markersArray);
  } else {
    /**
     * Convert marker clusterers to individual markers.
     *   Clear all the markers from MarkerClusterer.
     *   Set the map of each marker to be the current map.
     */
    this.MarkerClusterer.clearMarkers();
    Object.values(this.markersObj)
      .forEach( marker => marker.setMap(this.map));
  }
}
```
Also, `createMarker` and `removeMarker` have some extra work if `useMC` is true.
```javascript
// In marker_manager.js
createMarker(collision, taxi, bike, motorcycle, ped, useMC) {
  ...
  /**
   * Create a new marker for the collision.
   * Add a `click` listener to the marker.
   * Add the marker to this.markersObj.
   */
  if (useMC) {
    this.MarkerClusterer.addMarker(marker);
  }
}

removeMarker(marker, useMC) {
  ...
  /**
   * Delete the marker from the map and this.markersObj.
   */
  if (useMC) {
    this.MarkerClusterer.removeMarker(marker);
  }
}
```
