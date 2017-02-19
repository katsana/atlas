import { Position } from './position'
import _ from 'underscore'

export abstract class Canvas {
  /**
   * Get canvas service.
   *
   * @type {string}
   */
  abstract private service: string;

  /**
   * The map instance.
   *
   * @type {object}
   */
  protected instance: any;

  /**
   * Construct a new class instance.
   *
   * @param {string} id
   * @param {object} options
   */
  constructor(id: string, options: any = {}) {
    this.instance = this.make(id, options);
  }

  /**
   * Get the map instance.
   *
   * @return {object}
   */
  get(): any {
    return this.instance;
  }

  /**
   * Allow canvas to be extended.
   *
   * @param  {object}  extender
   * @return {this}
   */
  extend(extender: any): this {
    if (_.isFunction(extender[this.service])) {
      extender[this.service].apply(extender, [this]);
    }

    return this
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
    return callback.apply(this, [this.instance]);
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
   * Make the map instance.
   *
   * @param {string} id
   * @param {any}    options
   */
  abstract make(id: string, options: any): void;

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
