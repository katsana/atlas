import { Canvas as Map } from '../canvas'
import { Position } from './position'
import { Theme } from './theme'
import L from 'mapbox.js'
import _ from 'lodash'

export class Canvas extends Map {
  /**
   * Make the map instance.
   *
   * @param {string} id
   * @param {object} options
   */
  make(id: string, options: any): void {
    let config = {
      zoom: options.zoom ? options.zoom : 7,
      minZoom: options.minZoom ? options.minZoom : 7,
      trackResize: true,
      zoomControl: false,
      attributionControl: false
    };

    return new L.map(id, _.extend(config, options));
  }

  addTheme(theme: Theme): this {
    let styleControl = L.control.layers(theme.asTiles());
    let zoomControl = new L.control.zoom();
    let tile = theme.activeTile();

    styleControl.addTo(this.instance);
    zoomControl.setPosition('topright').addTo(this.instance);

    tile.on('ready', () => {
      tile.addTo(this.instance);
    });

    this.instance.on('baselayerchange', (e) => {
      theme.activate(e.name);
    });

    return this;
  }

  /**
   * Bound map to.
   *
   * @param {object} bounds
   * @return {this}
   */
  boundTo(bounds: any): this {
    return this.pipe(function(map) {
      map.fitBounds(bounds);
      map.setZoom(Math.min(map.getBoundsZoom(bounds), 16));
    });
  }

  /**
   * Center map to.
   *
   * @param {Position} position
   * @param {number}   zoom
   * @return {this}
   */
  centerTo(position: Position, zoom?: number): this {
    return this.pipe(function(map) {
      if (zoom == null)
        zoom = map.getZoom() ? map.getZoom() : 9;
      if (zoom < 10)
        zoom = 16;

      map.setCenter(Position.via(position));
    });
  }

  /**
   * Pan map to.
   *
   * @param {Position} position
   * @return {this}
   */
  panTo(position: Position): this {
    return this.pipe(function(map) {
      map.panTo(Position.via(position));
    });
  }
}
