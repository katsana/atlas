import { Avatar as BaseAvatar } from '../avatar'
import { Marker } from './marker'
import { Position } from './position'

var L = require('mapbox.js');

export class Avatar extends BaseAvatar {
  /**
   * Make the marker instance.
   *
   * @param  {Position} position
   * @param  {object}   options
   * @return {Marker}
   */
  make(position: Position, options: any): this {
    this.instance = new Marker(position, {
      className: options.className ? options.className : '',
      icon: this.icon,
      riseOnHover: options.riseOnHover ? options.riseOnHover : false
    });

    return this;
  }

  /**
   * Make icon for marker.
   *
   * @param  {object} options
   * @return {object}
   */
  makeIcon(options: any): any {
    return L.divIcon({
      iconSize: [45, 45],
      iconAnchor: [22.5, 45],
      className: 'leaflet-avatar-icon',
      html: `<object id="avatar-icon-${this.vehicle.id}" type="image/svg+xml" data="${options.url}"></object>`
    });
  }
}
