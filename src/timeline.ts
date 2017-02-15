import { Canvas } from './canvas'
import { Breadcrumb } from './breadcrumb'
import { Position } from './position'
import _ from 'lodash'

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
      position = Position.via(position);

      if (!_.isArray(position)) {
        position = [position];
      }

      this.position = _.last(position);
    }
  }

  /**
   * Center to current position.
   *
   * @return {this}
   */
  abstract boundTo(): this;
}
