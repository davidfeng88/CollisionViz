# CollisionViz
Interact with CollisionViz [here](https://davidfeng.us/CollisionViz) or [here](https://davidfeng88.github.io/CollisionViz).

CollisionViz shows the location and time of motor vehicle collisions in New York City. It is built with React.js and Redux. It uses [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) and [NYPD Motor Vehicle Collisions API](https://dev.socrata.com/foundry/data.cityofnewyork.us/qiz3-axqb).

![demo](assets/images/demo.gif)

## Features
The user can select the date and the start time of the visualization.

The current map time and time range of the collisions are shown.

The user can click on map icons to see the collision details (shown in [Info Windows](https://developers.google.com/maps/documentation/javascript/infowindows)). Only entries with non-zero values are shown.

More settings and more map options are also available. Some settings are disabled during the visualization. Date change resets the start time to the default value (7:00 AM).

### Icon Settings
The user can choose to show custom icons for collisions involving taxis, bicycles, motorcycles, and collisions that caused pedestrian injuries or deaths.

**Note**: this does not change the icons that are already on the map. Also, the icons have priorities as taxi > bicycle > motorcycle > pedestrian (e.g. if a taxi hit a bicycle, the icon would be a taxi).

### Map Layers
The user can toggle four layers on and off the map. By default, the heatmap layer is turned on while the other three are turned off.
* The heatmap layer shows a heatmap based on all the collisions on the date selected.
* The traffic layer shows the real-time (user time) traffic information.
* The transit layer displays the public transit network.
* The bicycling Layer renders bike paths, suggested bike routes and other overlays specific to bicycling usage.

ToDo:
Production React
create a Release?
Optimize google speed test?


commit history:

dev log:
Rookie mistakes:
use <strong> instead of <span className="bold">

How to organize a redux store:
do I need it across components? collisions in the store?

forget webpack
`npm start`
forget SCSS watch
`sass --watch scss/main.scss:css/main.css`
Chrome default refresh does not refresh the stylesheet (need validation)
* setState may be asynchronous, so do not rely on the new this.props and this.state value for calculating the next state.
```
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
Ref: [State and Lifecycle - React](https://facebook.github.io/react/docs/state-and-lifecycle.html)

heroku only supports postgresql, not sqlite3. So choose it correctly at the beginning.
*Switch to postgresql!!*
1. Database yml change postgresql. Gem file change. Bundle install
Rake db:drop db:create db migrate
Cannot change time to date time because the database cannot convert the data. It does not know the date and timezone.
Solution: delete and add the column.
If `FATAL:  permission denied for database "postgres"
DETAIL:  User does not have CONNECT privilege.`
Heroic restart works
```
heroku restart // restart the dyno
heroku rake db:migrate
```
If that doesn't work, then try.
```
heroku pg:reset DATABASE_URL   #Literally type in heroku pg:reset DATABASE_URL, which destroys the database

heroku rake db:migrate
```
2. Heroku cannot create a database permission denied for database "postgres"
User does not have CONNECT privilege.
Delete production part in `database.yml`


* move horizontally: because of the scroll bar

* JSX mixed array:
```
      detailsArray.push(`${this.capitalize(key)}: ${collision[key]}`);
      detailsArray.push(<span key={key}><br /></span>);
```

### Import the csv information to a database
References:
[How To Import CSV Files In Rails — Matt Morgante](http://www.mattmorgante.com/technology/csv)
[Seeding a Rails database with a CSV file · GitHub](https://gist.github.com/arjunvenkat/1115bc41bf395a162084)


visual hint:
disable inputs when it's playing;
toggle;
animations of extra panels;
spinner

what to put in instance variable, what to put in state
how to animation (and what can go wrong)
* Handle initialTime state when resetting filter and
[javascript - setInterval in a React app - Stack Overflow](https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app)
and Modals




Google map features used:
* Google Map style guide
https://developers.google.com/maps/documentation/javascript/styling
https://mapstyle.withgoogle.com/
[Custom markers](https://developers.google.com/maps/documentation/javascript/custom-markers), [heatmap](https://developers.google.com/maps/documentation/javascript/heatmaplayer), and [traffic, transit and bicycling layer](https://developers.google.com/maps/documentation/javascript/trafficlayer) are created using the Google Maps JavaScript API.

fusion table does not work: deppasate when zoom in.

## Implementation

show code:
Incorporate API and fetch
vanilla JS: setInterval/clearInterval

control panel: oneStep edge cases
map: a lot of them
fetch collisions => component will receive props

marker marker_manager

Alternative Data source:
https://cloud.google.com/bigquery/public-data/nypd-mv-collisions


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
The state contains two slices:
- `collisions` contains all the collisions of the selected day. The reducer organizes the collisions into arrays based on their time.
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

### Incorporate other tools
* [MarkerClusterers](https://developers.google.com/maps/documentation/javascript/marker-clustering)
An array of markers
* [Google Charts](https://developers.google.com/chart/) ([w3school tutorial](https://www.w3schools.com/howto/howto_google_charts.asp)) for data analysis. For example, compare time/location distributions of collisions between weekday vs. weekend, winter vs. summer, rainy vs. sunny, etc.
