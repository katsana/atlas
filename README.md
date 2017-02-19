Atlas
=====

A simple map services engine developed for KATSANA™.

## Installation

> Coming soon!

### Import

Once install, you should be able to easily import the library using the following:

```javascript
const Atlas = require('./atlas.js');

window.Atlas = Atlas;
```

### Configuration

### Using Mapbox

```javascript
L.mapbox.accessToken = 'xyz';

Atlas.config({
  mapbox: {
    accessToken: L.mapbox.accessToken,
    styles: {
      Street: 'mapbox.street'
    }
  }
})
```

### Using Google

> Coming soon!

### Getting Driver

Atlas uses the concept of driver to make it easier for developer to swap between Google Map Developer API with Mapbox Developer API.

```javascript
const google = (new Atlas()).driver('google');
const mapbox = (new Altas()).driver('mapbox');
```

### Usages

#### Creating a Map

```javascript
let canvas = mapbox.newCanvas('map', {});
```

#### Creating a Position

```javascript
let position = mapbox.newPosition(3.161907, 101.617954)
```

### Creating a Routing

```javascript
let routing = mapbox.newRouting(canvas, {});
routing.start(position);
```
