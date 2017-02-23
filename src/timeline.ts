import { Canvas } from './canvas'
import { Breadcrumb } from './breadcrumb'
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
}
