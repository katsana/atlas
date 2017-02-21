import { Canvas } from './canvas'
import { Marker } from './marker'
import { Icon } from './icon'
import { Position } from './position'

export abstract class Breadcrumb {
  /**
   * Avatar instance.
   *
   * @type {Marker|Icon|null}
   */
  protected avatar: Marker|Icon;

  /**
   * The position.
   *
   * @type {Position|Array}
   */
  protected position: any;

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
    this.polyline.addLatLng(Position.via(position));
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
   * Start polyline with a position.
   *
   * @param  {Position} position
   * @return {this}
   */
  start(position: Position): this {
    this.addTo(this.canvas);
    this.add(position);

    return this;
  }

  /**
   * End polyline with a position.
   *
   * @param  {Position} position
   * @return {this}
   */
  end(position: Position): this {
    this.add(position);

    return this;
  }

  /**
   * Attach marker to breadcrumb.
   *
   * @param  {Marker|Icon} avatar
   * @return {this}
   */
  withMarker(avatar: Marker|Icon): this {
    this.avatar = avatar;

    return this;
  }

  /**
   * Add polyline to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  abstract addTo(canvas: Canvas): this;

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
