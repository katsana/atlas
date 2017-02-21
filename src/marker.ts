import { Canvas } from './canvas'
import { Position } from './position'

export abstract class Marker {
  /**
   * The marker instance.
   *
   * @type {object}
   */
  protected instance: any;

  /**
   * Show the label status.
   *
   * @type {boolean}
   */
  protected labelShown: boolean = false;

  /**
   * Force show the label status.
   *
   * @type {boolean}
   */
  protected forceShown: boolean = false;

  /**
   * Construct a new class.
   *
   * @param {Position} position
   * @param {object}   options
   */
  constructor(position: Position, options: any = {}) {
    this.instance = this.make(Position.via(position), options);
  }

  /**
   * Get marker instance.
   *
   * @return {any}
   */
  get(): any {
    return this.instance;
  }

  /**
   * Toggle force show label.
   *
   * @return {this}
   */
  toggleForceLabel(): this {
    this.forceShown = !this.forceShown;

    return this;
  }

  /**
   * Toggle show label.
   *
   * @return {this}
   */
  toggleLabel(): this {
    if (this.labelShown)
      this.hideLabel();
    else
      this.showLabel();

    return this;
  }

  /**
   * Get marker instance.
   *
   * @return {any}
   */
  get marker(): any {
    return this.get();
  }

  /**
   * Get position of marker.
   *
   * @return {Position}
   */
  abstract get position(): Position;

  /**
   * Make a marker.
   *
   * @param  {object} position
   * @param  {object} options
   * @return {object}
   */
  abstract make(position: any, options: any): any;

  /**
   * Add marker to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  abstract addTo(canvas: Canvas): this;

  /**
   * Add label to marker.
   *
   * @param  {string} text
   * @param  {object} options
   * @return {this}
   */
  abstract label(text: string, options: any): this;

  /**
   * Hide the marker.
   *
   * @return {this}
   */
  abstract hide(): this;

  /**
   * Hide the label.
   *
   * @return {this}
   */
  abstract hideLabel(): this;

  /**
   * Move marker to position.
   *
   * @param  {Position} position
   * @return {this}
   */
  abstract moveTo(position: Position): this;

  /**
   * Add popup for marker.
   *
   * @param  {string} text
   * @param  {object} options
   * @return {this}
   */
  abstract popup(text: string, options: any): this;

  /**
   * Remove the marker from canvas.
   *
   * @param {Canvas} canvas
   * @return {this}
   */
  abstract removeFrom(canvas: Canvas): this;

  /**
   * Show the marker.
   *
   * @return {this}
   */
  abstract show(): this;

  /**
   * Show the marker.
   *
   * @return {this}
   */
  abstract showLabel(): this;

  /**
   * Show popup.
   *
   * @return {this}
   */
  abstract showPopup(): this;
}
