import { Icon as BaseIcon } from '../icon'
import { Marker } from './marker'
import { Position } from './position'

var L = require('mapbox.js');

export class Icon extends BaseIcon {
  /**
   * Create a basic avatar.
   *
   * @param {object} options
   * @return {this}
   */
  createBasic(position: Position, options: any = {}) {
    let icon = L.mapbox.marker.icon({
      'marker-size': options.size ? options.size : 'large',
      'marker-symbol': options.label ? options.label : 'car',
      'marker-color': options.color ? options.color : '#fa0'
    });

    this.instance = this.make(position, icon);

    return this;
  }

  /**
   * Create a SVG avatar.
   *
   * @param {object} options
   * @return {this}
   */
  createImage(position: Position, options: any = {}) {
    let icon = L.icon({
      className: options.className ? options.className : null,
      iconUrl: options.url,
      iconAnchor: options.anchor,
      iconSize: options.size
    });

    this.instance = this.make(position, icon, {
      className: options.className ? options.className : null,
      riseOnHover: options.riseOnHover ? options.riseOnHover : false
    });

    return this;
  }

  /**
   * Make the marker instance.
   *
   * @param  {Position} position
   * @param  {object}   icon
   * @param  {object}   options
   * @return {Marker}
   */
  make(position: Position, icon: any, options: any = {}): Marker {
    return new Marker(position, {
      className: options.className ? options.className : '',
      icon: icon,
      riseOnHover: options.riseOnHover ? options.riseOnHover : false
    });
  }
}
