import { Position as Base } from '../position'
import { MapboxService } from './service'
import { Theme } from './theme'
import L from 'mapbox.js'

export class Position extends Base {
  protected _theme: Theme;

  theme(theme: Theme): this {
    this._theme = theme;

    return this;
  }

  /**
   * Get the static map image for position.
   *
   * @param  {string} dimension
   * @param  {number} zoom
   * @return {string}
   */
  image(dimension: string, zoom: number): string {
    return `https://api.mapbox.com/v4/{this._theme.current}/pin-l-car+f44(${this.serviceCoordinate},${zoom})/${this.serviceCoordinate},${zoom}/${dimension}.png?access_token=${MapboxService.accessToken()}`;
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
