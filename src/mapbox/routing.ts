import { Canvas } from './canvas'
import { Position } from './position'
import { Routing as Breadcrumb } from '../routing'
import L from 'mapbox.js'

export class Routing extends Breadcrumb {
  /**
   * Add new position.
   *
   * @param {Position} position
   * @return {this}
   */
  add(position: Position): this {
    this.polyline.addLatLng(position);

    return super.add(position);
  }

  /**
   * Center to current position.
   *
   * @param  {Position} position
   */
  centerTo(position: Position): this {
    if (this.routing == 'follow')
      this.canvas.panTo(Position.via(position));

    return this;
  }

  /**
   * Make polyline.
   *
   * @param  {object}  options
   * @return {object}
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
