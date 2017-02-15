import { Position as Coordinate } from '../position'

export class Position extends Coordinate {
  /**
   * Get the position.
   *
   * @return {object}
   */
  get position(): any {
    return {lat: this.latitude, lng: this.longitude};
  }

  /**
   * Get the service coordinate.
   *
   * @return {string}
   */
  get serviceCoordinate(): string {
    return this.coordinate;
  }
}
