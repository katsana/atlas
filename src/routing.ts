import { Breadcrumb } from './breadcrumb'
import { Position } from './position'

export abstract class Routing extends Breadcrumb {
  /**
   * Routing mode.
   *
   * @type {string}
   */
  protected routing: string;

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
