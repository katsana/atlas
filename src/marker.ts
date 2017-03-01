import { Canvas } from './canvas'
import { Position } from './position'

export abstract class Marker {
  /**
   * The marker instance.
   *
   * @type {object}
   */
  protected instance: any;

  /**
   * Construct a new class.
   *
   * @param {Position} position
   * @param {object}   options
   */
  constructor(position: Position, options: any = {}) {
    this.instance = this.make(Position.via(position), options);
  }

  /**
   * Get marker instance.
   *
   * @return {any}
   */
  get(): any {
    return this.instance;
  }

  /**
   * Get marker instance.
   *
   * @return {any}
   */
  get marker(): any {
    return this.get();
  }

  /**
   * Make a marker.
   *
   * @param  {object} position
   * @param  {object} options
   * @return {object}
   */
  abstract make(position: any, options: any): any;

  /**
   * Add marker to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  abstract addTo(canvas: Canvas): this;

  /**
   * Hide the marker.
   *
   * @return {this}
   */
  abstract hide(): this;

  /**
   * Move marker to position.
   *
   * @param  {Position} position
   * @return {this}
   */
  abstract moveTo(position: Position): this;

  /**
   * Remove the marker from canvas.
   *
   * @param {Canvas} canvas
   * @return {this}
   */
  abstract removeFrom(canvas: Canvas): this;

  /**
   * Show the marker.
   *
   * @return {this}
   */
  abstract show(): this;

  /**
   * Get position of marker.
   *
   * @return {Position}
   */
  abstract get position(): Position;
}
