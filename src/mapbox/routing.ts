import { Canvas } from './canvas'
import { Position } from './position'
import { Routing as Breadcrumb } from '../routing'

var L = require('mapbox.js');

export class Routing extends Breadcrumb {
  /**
   * Add new position.
   *
   * @param {Position} position
   * @return {this}
   */
  add(position: Position): this {
    this.polyline.addLatLng(Position.via(position));

    return super.add(position);
  }

  /**
   * Add polyline to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  addTo(canvas: Canvas): this {
    this.polyline.addTo(Canvas.via(canvas));

    return this;
  }

  /**
   * Center to current position.
   *
   * @param  {Position} position
   */
  centerTo(position: Position): this {
    if (this.avatar != null)
      this.avatar.moveTo(position);

    if (this.routing == 'follow')
      this.canvas.panTo(position);

    return this;
  }

  /**
   * Make polyline.
   *
   * @param  {object}  options
   * @return {object}
   */
  make(options: any): any {
    return L.polyline([], {
      className: options.className ? options.className : '',
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
    Canvas.via(canvas).removeLayer(this.polyline);

    return this;
  }
}
