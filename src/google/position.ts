import { Position as Coordinate } from '../position'

export class Position extends Coordinate {
  /**
   * Make a position
   */
  make(): any {
    console.log(this.latitude, this.longitude);
    return new google.maps.LatLng(this.latitude, this.longitude);
  }

  /**
   * Get the static map image for position.
   *
   * @param  {string} dimension
   * @param  {number} zoom
   * @return {string}
   */
  image(dimension: string, zoom: number): string {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${this.serviceCoordinate}&zoom=${zoom}&size=${dimension}&markers=color:red%7Csize:mid%7C${this.serviceCoordinate}&key=${this.options.accessToken}`;
  }

  /**
   * Get the service coordinate.
   *
   * @return {string}
   */
  get serviceCoordinate(): string {
    return this.instance.toUrlValue();
  }
}
