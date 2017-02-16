import { Position as Base } from '../position'
import L from 'mapbox'

export class Position extends Base {
  /**
   * Get the static map image for position.
   *
   * @param  {string} dimension
   * @param  {number} zoom
   * @return {string}
   */
  image(dimension: string, zoom: number): string {
    return `https://api.mapbox.com/v4/Satellite/pin-l-car+f44(${this.serviceCoordinate},${zoom})/${this.serviceCoordinate},${zoom}/${dimension}.png?access_token=${L.mapbox.accessToken}`;
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
