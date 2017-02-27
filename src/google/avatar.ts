import { Avatar as BaseAvatar } from '../avatar'
import { Marker } from './marker'
import { Position } from './position'
import  CustomMarker from './markers/custom.js'

export class Avatar extends BaseAvatar {
  /**
   * Make the marker instance.
   *
   * @param  {Position} position
   * @param  {object}   icon
   * @param  {object}   options
   * @return {Marker}
   */
  make(position: Position, options: any): this {
    this.instance = new CustomMarker(
      Position.via(position),
      _.extend(this.icon, options)
    );

    return this
  }

  /**
   * Make icon for marker.
   *
   * @param  {object} options
   * @return {object}
   */
  makeIcon(options: any): any {
    return {
      iconSize: [45, 45],
      iconAnchor: [22.5, 45],
      className: 'leaflet-avatar-icon',
      html: `<object id="avatar-icon-${this.vehicle.id}" type="image/svg+xml" data="${options.url}"></object>`
    };
  }
}
