import { Position as Base } from '../position'
import L from 'mapbox'

export class Position extends Base {
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
