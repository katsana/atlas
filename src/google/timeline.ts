import { Canvas } from './canvas'
import { Position } from './position'
import { Timeline as Breadcrumb } from '../timeline'

export class Timeline extends Breadcrumb {
  /**
   * Boundaries.
   *
   * @type {any}
   */
  protected boundaries: any;

  /**
   * Construct a new class.
   *
   * @param {Canvas} canvas
   * @param {object} options
   * @param {object} position
   */
  constructor(canvas: Canvas, options: any = {}, position?: any) {
    super(canvas, options, position);
  }

  /**
   * Add path to breadcrumb.
   *
   * @param {Position} position
   */
  addPath(position: Position) {
    this.polyline.getPath().push(Position.via(position));
  }

  /**
   * Add polyline to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  addTo(canvas: Canvas): this {
    this.polyline.setMap(Canvas.via(canvas));

    return this;
  }

  /**
   * Center to current position.
   *
   * @return {this}
   */
  boundTo(): this {
    // @TODO build boundaries.

    return this;
  }

  /**
   * Bring timeline to the back.
   *
   * @return {this}
   */
  bringToBack(): this {
    this.polyline.setVisible(false);

    return this;
  }

  /**
   * Bring timeline to the front.
   *
   * @return {this}
   */
  bringToFront(): this {
    this.polyline.setVisible(true);

    return this;
  }

  /**
   * Make polyline.
   *
   * @param  {object}  options
   * @return {this}
   */
  make(options: any): any {
    return new google.maps.Polyline({
      color: options.color ? options.color : '#78ACD9',
      opacity: options.opacity ? options.opacity : 1.0
    });
  }

  /**
   * Remove polyline from canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  removeFrom(canvas: Canvas): this {
    this.polyline.setMap(null);

    return this;
  }

  /**
   * Set polyline style.
   *
   * @param  {object}  options
   * @return {this}
   */
  setStyle(options: any): this {
    this.polyline.setOptions({
      color: options.color ? options.color : '#78ACD9',
      opacity: options.opacity ? options.opacity : 1.0
    });

    return this;
  }
}
