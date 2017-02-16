import { Canvas } from './canvas'
import { Position } from './position'
import { Service } from '../service'
import { Theme } from './theme'
import L from 'mapbox.js'

export class Mapbox extends Service {
  /**
   * Theme instance.
   *
   * @type {Theme}
   */
  protected theme: Theme;

  /**
   * Construct a new class.
   *
   * @param {object} options
   */
  constructor(options: any) {
    super(options);

    this.theme = new Theme();
  }

  /**
   * Access token.
   *
   * @return {string}
   */
  accessToken(): string {
    return this.options.accessToken;
  }

  /**
   * Construct a new canvas.
   *
   * @param  {string} id
   * @param  {object} options
   * @return {Canvas}
   */
  newCanvas(id: string, options: any): Canvas {
    return (new Canvas(id, options))
              .theme(this.theme);
  }

  /**
   * Construct a new position.
   *
   * @param  {number}   latitude
   * @param  {number}   longitude
   * @return {Position}
   */
  newPosition(latitude: number, longitude: number): Position {
    return (new Position(latitude, longitude))
              .theme(this.theme);
  }
}
