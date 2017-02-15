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
    this.polyline = this.makePolyline(options);
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
  abstract makePolyline(options: any): this;

  /**
   * Remove polyline from canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  abstract removeFrom(canvas: Canvas): this;
}
