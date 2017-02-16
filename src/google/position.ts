import { Position as Coordinate } from '../position'

export class Position extends Coordinate {
  /**
   * Get the static map image for position.
   *
   * @param  {string} dimension
   * @param  {number} zoom
   * @return {string}
   */
  image(dimension: string, zoom: number): string {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${this.serviceCoordinate}&zoom=${zoom}&size=${dimension}&markers=color:red%7Csize:mid%7C${this.serviceCoordinate}&key=${GoogleService.accessToken()}`;
  }

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
