import { Canvas } from './canvas'
import { Position } from './position'
import { Service } from '../service'
import L from 'mapbox'

export class MapboxService implements Service {
  /**
   * Service options.
   *
   * @type {object}
   */
  protected options: any;

  /**
   * Construct a new class.
   *
   * @param {object} options
   */
  constructor(options: any) {
    this.options = options;
  }

  /**
   * Construct a new canvas.
   *
   * @param  {string} id
   * @param  {object} options
   * @return {Canvas}
   */
  newCanvas(id: string, options: any): Canvas {
    return new Canvas(id, options);
  }

  /**
   * Construct a new position.
   *
   * @param  {number}   latitude
   * @param  {number}   longitude
   * @return {Position}
   */
  newPosition(latitude: number, longitude: number): Position {
    return new Position(latitude, longitude);
  }
}