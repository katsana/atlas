import { Icon as BaseIcon } from '../icon'
import { Marker } from './marker'
import { Position } from './position'

export class Icon extends BaseIcon {
  /**
   * Construct a new avatar.
   *
   * @param {string} label
   * @param {string} color
   * @param {string} size
   */
  constructor(label: string, color: string = '#fa0', size: string = 'large') {
    super();

    this.icon = L.mapbox.marker.icon({
      'marker-size': size,
      'marker-symbol': label,
      'marker-color': color
    })
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
