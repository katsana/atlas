import { Position as Base } from '../position'

export class Position extends Base {
  /**
   * Get the position.
   *
   * @return {any}
   */
  get position(): any {
    return new L.latLng(this.latitude, this.longitude)
  }

  /**
   * Get the service coordinate.
   *
   * @return {string}
   */
  get serviceCoordinate(): string {
    return `${this.longitude},${this.latitude}`
  }
}
