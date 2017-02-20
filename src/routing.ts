import { Breadcrumb } from './breadcrumb'
import { Position } from './position'

export abstract class Routing extends Breadcrumb {
  /**
   * Routing mode.
   *
   * @type {string}
   */
  protected routing: string = 'follow';


  /**
   * Start polyline with a position.
   *
   * @param  {Position} position
   * @return {this}
   */
  start(position: Position): this {
    super.start(position);
    this.centerTo(position);

    return this;
  }

  /**
   * Get routing mode.
   *
   * @return {string}
   */
  get mode(): string {
    return this.routing;
  }

  /**
   * Set routing mode.
   *
   * @param {string} mode
   */
  set mode(mode: string) {
    this.routing = mode;

    this.centerTo(this.position);
  }
}
