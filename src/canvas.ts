import _ from 'lodash'
import { Position } from './position'

export abstract class Canvas {
  /**
   * The map resolver.
   *
   * @type {object}
   */
  protected resolver: any;

  /**
   * Construct a new class instance.
   *
   * @param {string} id
   * @param {object} options
   */
  constructor(id: string, options: any = {}) {
    this.resolver = null;
    this.boot(id, options);
  }

  /**
   * Get the map instance.
   *
   * @return {object}
   */
  get(): any {
    return this.resolver;
  }

  /**
   * Pipe to map instance.
   *
   * @param {Function} callback
   * @return {this}
   */
  pipe(callback: Function): this {
    this.tap(callback);

    return this;
  }

  /**
   * Tap to map instance.
   *
   * @param {Function} callback
   * @return {this}
   */
  tap(callback) {
    return callback(this.resolver);
  }

  /**
   * Resolve instance of canvas.
   *
   * @param  {object} canvas
   * @return {object}
   */
  static via(canvas: any) {
    if (canvas instanceof Canvas)
      return canvas.get();

    return canvas;
  }

  /**
   * Boot the map instance.
   *
   * @param {string} id
   * @param {any}    options
   */
  abstract boot(id: string, options: any): void;

  /**
   * Bound map to.
   *
   * @param {object} bounds
   * @return {this}
   */
  abstract boundTo(bounds: any): this;

  /**
   * Center map to.
   *
   * @param {Position} position
   * @param {number}   zoom
   * @return {this}
   */
  abstract centerTo(position: Position, zoom?: number): this;

  /**
  /**
   * Pan map to.
   *
   * @param  {Position} position
   * @return {this}
   */
  abstract panTo(position: Position): this;
}
