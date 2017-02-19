import { Avatar as BaseAvatar } from '../avatar'
import { Marker } from './marker'
import { Position } from './position'
import L from 'mapbox.js'

export class Avatar extends BaseAvatar {
  /**
   * Make the marker instance.
   *
   * @param  {Position} position
   * @param  {object}   icon
   * @param  {object}   options
   * @return {Marker}
   */
  make(position: Position, icon: any, options: any): Marker {
    let config = {
      className: options.className ? options.className : '',
      icon: icon,
      riseOnHover: options.riseOnHover ? options.riseOnHover : false
    };

    return new Marker(position, config);
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
