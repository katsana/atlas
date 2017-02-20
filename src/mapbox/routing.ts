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
    let config = {
      className: options.className ? options.className : ''
    };

    return L.polyline([], config);
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
