# CollisionViz
[CollisionViz live][heroku]

[heroku]: http://collisionviz.davidfeng.us/

CollisionViz is a web application which visualizes the location and time of all the motor vehicle collisions during a certain period of time in New York City. On the back-end, CollisionViz utilizes Ruby on Rails and a PostgreSQL database; on the front-end, it uses React.js with a Redux architectural framework. Currently, it shows collisions on 6/22/2017. Data is from NYPD.

## Functionality & MVP
CollisionViz will put markers on a embedded Google Map of NYC based on the longitude and latitude of the collision. Users will be able to filter the collisions based on the time and location (map border) they happened. A production README is also needed.

## Wireframes
![wireframes](CollisionViz.png)

## Technologies
* JavaScript
* NYPD Data
* Google Maps API

Data provided by NYPD (to be stored in database)
* Date
* Time
* Longitude
* Latitude

## Future Directions

### Collision filter by map borders
Resize/move the map eliminates the collisions that are outside of the map border.

### Icon variation
Use different icons for collisions involving taxi, bikes, etc.

### Collision details
Click on a marker on map shows a new collision detail React component.

### Sound effects
Play an optional sound effect when markers for new collisions are placed on the map.
