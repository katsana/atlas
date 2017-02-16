import { Icon } from '../icon'
import { Marker } from './marker'
import { Position } from './position'
import L from 'mapbox'

export class Avatar extends Icon {
  /**
   * Construct a new avatar.
   *
   * @param {object} vehicle
   * @param {object} options
   */
  constructor(protected vehicle: any, options: any = {}) {
    super();

    this.icon = L.divIcon({
      iconSize: [45, 45],
      iconAnchor: [22.5, 45],
      className: 'leaflet-avatar-icon',
      html: `<object id="avatar-icon-${vehicle.id}" type="image/svg+xml" data="${options.url}"></object>`
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
  make(position: Position, icon: any, options: any): Marker {
    options.icon = icon;

    return new Marker(position, options);
  }
}
