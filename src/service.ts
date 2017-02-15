import { Canvas } from './canvas'
import { Position } from './position'

export interface Service {
  /**
   * Construct a new canvas.
   *
   * @param  {string} id
   * @param  {any}    options
   * @return {Canvas}
   */
  newCanvas(id: string, options: any): Canvas;

  /**
   * Construct a new position.
   *
   * @param  {number}   latitude
   * @param  {number}   longitude
   * @return {Position}
   */
  newPosition(latitude: number, longitude: number): Position;
}
