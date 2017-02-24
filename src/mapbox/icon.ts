import { Icon as BaseIcon } from '../icon'
import { Marker } from './marker'
import { Position } from './position'

var L = require('mapbox.js');

export class Icon extends BaseIcon {
  /**
   * Create a basic avatar.
   *
   * @param {string} label
   * @param {string} color
   * @param {string} size
   */
  createBasic(label: string, color: string = '#fa0', size: string = 'large') {
    this.icon = L.mapbox.marker.icon({
      'marker-size': size,
      'marker-symbol': label,
      'marker-color': color
    });

    return this;
  }

  /**
   * Create a SVG avatar.
   *
   * @param {object} options
   */
  createSvg(options: any = {}) {

  }

  /**
   * Make the marker instance.
   *
   * @param  {Position} position
   * @param  {object}   icon
   * @param  {object}   options
   * @return {Marker}
   */
  make(position: Position, icon: any, options: any): Marker {
    options.icon = icon;

    return new Marker(position, options);
  }
}
