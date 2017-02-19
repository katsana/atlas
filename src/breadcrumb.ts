import { Canvas } from './canvas'
import { Position } from './position'

export abstract class Breadcrumb {
  /**
   * The position.
   *
   * @type {Position|Array}
   */
  protected position;

  /**
   * The service polyline.
   *
   * @type {object}
   */
  protected polyline: any;

  /**
   * Construct a new class.
   *
   * @param {Canvas}   canvas
   * @param {object}   options
   */
  constructor(protected canvas: Canvas, options: any = {}) {
    this.polyline = this.make(options);
  }

  /**
   * Add new position.
   *
   * @param {Position} position
   * @return {this}
   */
  add(position: Position): this {
    this.position = position;
    this.centerTo(position);

    return this;
  }

  /**
   * Remove from current canvas.
   *
   * @return {this}
   */
  remove(): this {
    return this.removeFrom(this.canvas);
  }

  /**
   * Start with a position.
   *
   * @param  {Position} position
   * @return {this}
   */
  start(position: Position): this {
    this.add(position);
    this.canvas.centerTo(position);

    return this;
  }

  /**
   * Center to current position.
   *
   * @param  {Position} position
   * @return {this}
   */
  abstract centerTo(position: Position): this;

  /**
   * Make polyline.
   *
   * @param  {object}  options
   * @return {this}
   */
  abstract make(options: any): this;

  /**
   * Remove polyline from canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  abstract removeFrom(canvas: Canvas): this;
}
