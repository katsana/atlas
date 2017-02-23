import { Canvas } from './canvas'
import { Breadcrumb } from './breadcrumb'
import { Icon } from './icon'
import { Marker } from './marker'
import { Position } from './position'

var _ = require('underscore');

export abstract class Timeline extends Breadcrumb {
  /**
   * Construct a new class.
   *
   * @param {Canvas} canvas
   * @param {object} options
   * @param {object} position
   */
  constructor(protected canvas: Canvas, options: any = {}, position?: any) {
    super(canvas, options);

    if (position) {
      if (!_.isArray(position)) {
        position = [position];
      }

      this.position = _.last(position);
      this.start(position);
    }
  }

  /**
   * Attach marker to breadcrumb.
   *
   * @param  {Marker|Icon} avatar
   * @return {this}
   */
  withMarker(avatar: Marker|Icon): this {
    avatar.moveTo(this.position).addTo(this.canvas);

    return this;
  }

  /**
   * End polyline with a position.
   *
   * @param  {Position} position
   * @return {this}
   */
  end(position: Position): this {
    super.end(position);

    return this.boundTo();
  }

  /**
   * Center to current position.
   *
   * @return {this}
   */
  abstract boundTo(): this;

  /**
   * Bring timeline to the back.
   *
   * @return {this}
   */
  abstract bringToBack(): this;

  /**
   * Bring timeline to the front.
   *
   * @return {this}
   */
  abstract bringToFront(): this;

  /**
   * Center to current position.
   *
   * @param  {Position} position
   * @return {this}
   */
  centerTo(position: Position): this {
    return this;
  }
}
