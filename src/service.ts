import { Canvas } from './canvas'
import { Position } from './position'

export abstract class Service {
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
  constructor(options: any = {}) {
    this.options = options;
  }

  /**
   * Construct a new canvas.
   *
   * @param  {string} id
   * @param  {object} options
   * @return {Canvas}
   */
  abstract newCanvas(id: string, options: any): Canvas;

  /**
   * Construct a new position.
   *
   * @param  {number}   latitude
   * @param  {number}   longitude
   * @return {Position}
   */
  abstract newPosition(latitude: number, longitude: number): Position;
}
