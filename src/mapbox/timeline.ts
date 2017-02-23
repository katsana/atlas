import { Canvas } from './canvas'
import { Position } from './position'
import { Timeline as Breadcrumb } from '../timeline'

var L = require('mapbox.js');

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
   * Add polyline to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  addTo(canvas: Canvas): this {
    let map = Canvas.via(canvas);

    L.featureGroup().addTo(map).addLayer(this.polyline);
    this.polyline.addTo(map);

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
   * Bring timeline to the back.
   *
   * @return {this}
   */
  bringToBack(): this {
    this.polyline.bringToBack();

    return this;
  }

  /**
   * Bring timeline to the front.
   *
   * @return {this}
   */
  bringToFront(): this {
    this.polyline.bringToFront();

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
