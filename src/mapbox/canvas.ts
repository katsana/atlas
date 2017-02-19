import { Canvas as Map } from '../canvas'
import { Position } from './position'
import { Theme } from './theme'
import L from 'mapbox.js'
import _ from 'underscore'

export class Canvas extends Map {
  /**
   * Get canvas service.
   *
   * @type {string}
   */
  private service: string = 'mapbox'

  /**
   * Construct a new class instance.
   *
   * @param {string} id
   * @param {object} options
   * @param {Theme} theme
   */
  constructor(id: string, options: any = {}, theme: Theme) {
    super(id, options);
    this.theme(theme);
  }

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

    if (options.position instanceof Position) {
      config.center = Position.via(options.position)
    }

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
