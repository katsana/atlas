import { Canvas } from './canvas'
import { Position } from './position'
import { Timeline as Breadcrumb } from '../timeline'
import L from 'mapbox.js'

export class Timeline extends Breadcrumb {
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
   * Center to current position.
   *
   * @return {this}
   */
  boundTo(): this {
    this.polyline.redraw();
    this.canvas.boundTo(this.polyline.getBounds());

    return this;
  }

  /**
   * Make polyline.
   *
   * @param  {object}  options
   * @return {this}
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
