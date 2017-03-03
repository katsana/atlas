import { Canvas as Map } from '../canvas'
import { Position } from './position'
import { Theme } from './theme'

var L = require('mapbox.js');
var _ = require('underscore');

export class Canvas extends Map {
  /**
   * Get canvas service.
   *
   * @type {string}
   */
  protected service: string = 'mapbox'

  /**
   * Construct a new class instance.
   *
   * @param {string} id
   * @param {object} options
   */
  constructor(id: string, options: any = {}) {
    super(id, options);
    this.theme(options.theme);
  }

  /**
   * Make the map instance.
   *
   * @param {string} id
   * @param {object} options
   */
  make(id: string, options: any = {}): void {
    let atlas = options.atlas ? options.atlas : {};

    let config = {
      center: atlas.position ? Position.via(atlas.position) : null,
      attributionControl: atlas.attributionControl ? atlas.attributionControl : false,
      minZoom: atlas.minZoom ? atlas.minZoom : 7,
      trackResize: true,
      zoom: atlas.zoom ? atlas.zoom : 7,
      zoomControl: false
    };

    return new L.map(id, config);
  }

  /**
   * Set theme for canvas.
   *
   * @param  {Theme} theme
   * @return {this}
   */
  theme(theme: Theme): this {
    let tile = theme.activeTile;
    let styleControl = L.control.layers(theme.tiles());
    let zoomControl = new L.control.zoom();

    tile.on('ready', () => {
      tile.addTo(this.instance);
    });

    styleControl.addTo(this.instance);
    zoomControl.setPosition('topright').addTo(this.instance);

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

      map.setView(Position.via(position), zoom);
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
