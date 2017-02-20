import { Position as BasePosition } from '../position'
import { Theme } from './theme'

var L = require('mapbox.js');

export class Position extends BasePosition {
  /**
   * Get the static map image for position.
   *
   * @param  {string} dimension
   * @param  {number} zoom
   * @return {string}
   */
  image(dimension: string, zoom: number): string {
    if (!this.isValid())
      return ''

    return `https://api.mapbox.com/v4/${this.options.style}/pin-l-car+f44(${this.serviceCoordinate},${zoom})/${this.serviceCoordinate},${zoom}/${dimension}.png?access_token=${this.options.accessToken}`;
  }

  /**
   * Get the position.
   *
   * @return {object}
   */
  get position(): any {
    return new L.latLng(this.latitude, this.longitude);
  }

  /**
   * Get the service coordinate.
   *
   * @return {string}
   */
  get serviceCoordinate(): string {
    return `${this.longitude},${this.latitude}`;
  }
}
