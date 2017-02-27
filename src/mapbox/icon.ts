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
    this.icon = L.mapbox.marker.icon({
      'marker-size': options.size ? options.size : 'large',
      'marker-symbol': options.label ? options.label : 'car',
      'marker-color': options.color ? options.color : '#fa0'
    });

    return this.make(position, {
      className: options.className ? options.className : null,
      riseOnHover: options.riseOnHover ? options.riseOnHover : false
    });
  }

  /**
   * Create a HTML avatar.
   *
   * @param {object} options
   * @return {this}
   */
  createHtml(position: Position, options: any = {}) {
    this.icon = L.divIcon({
      className: options.className ? options.className : null,
      html: options.html,
      iconAnchor: options.anchor,
      iconSize: options.size
    });

    return this.make(position, {
      className: options.className ? options.className : null,
      riseOnHover: options.riseOnHover ? options.riseOnHover : false
    });
  }

  /**
   * Create an image avatar.
   *
   * @param {object} options
   * @return {this}
   */
  createImage(position: Position, options: any = {}) {
    this.icon = L.icon({
      className: options.className ? options.className : null,
      iconUrl: options.url,
      iconAnchor: options.anchor,
      iconSize: options.size
    });

    return this.make(position, {
      className: options.className ? options.className : null,
      riseOnHover: options.riseOnHover ? options.riseOnHover : false
    });
  }

  /**
   * Make the marker instance.
   *
   * @param  {Position} position
   * @param  {object}   icon
   * @param  {object}   options
   * @return {Marker}
   */
  make(position: Position, options: any = {}): this {
    this.instance = new Marker(position, {
      className: options.className ? options.className : '',
      icon: this.icon,
      riseOnHover: options.riseOnHover ? options.riseOnHover : false
    });

    return this;
  }
}
