import { Canvas } from './canvas'
import { Position } from './position'
import { Timeline as Breadcrumb } from '../timeline'
import L from 'mapbox'

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
   * @param  {Position} position
   * @return {this}
   */
  centerTo(position: Position): this {
    return this;
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
    return L.polyline([], options);
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
