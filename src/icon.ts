import { Canvas } from './canvas'
import { Marker } from './marker'
import { Position } from './position'

export abstract class Icon {
  /**
   * The icon instance.
   *
   * @type {any}
   */
  protected icon: any;

  /**
   * The icon instance.
   *
   * @type {Marker|any}
   */
  protected instance: Marker|any;

  /**
   * Add icon to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  addTo(canvas: Canvas): this {
    this.instance.addTo(canvas);

    return this;
  }

  /**
   * Get the marker instance.
   *
   * @return {Marker}
   */
  get(): Marker {
    return this.instance
  }

  /**
   * Hide the marker.
   *
   * @return {this}
   */
  hide(): this {
    this.instance.hide();

    return this;
  }

  /**
   * Bind label to icon.
   *
   * @param  {string} text
   * @param  {any}    options
   * @return {this}
   */
  label(text: string, options: any): this {
    this.instance.label(text, options).hideLabel();

    return this;
  }

  /**
   * Move icon to position.
   *
   * @param  {Position} position
   * @return {this}
   */
  moveTo(position: Position): this {
    this.instance.moveTo(position);

    return this;
  }

  /**
   * Bind popup to icon.
   *
   * @param  {string} text
   * @param  {any}    options
   * @return {this}
   */
  popup(text: string, options: any): this {
    this.instance.popup(text, options);

    return this;
  }

  /**
   * Remove icon from canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  removeFrom(canvas: Canvas): this {
    this.instance.removeFrom(canvas);

    return this;
  }

  /**
   * Set popup content.
   *
   * @param {string} content
   * @return {this}
   */
  setPopupContent(content: string): this {
    this.instance.setPopupContent(content);

    return this;
  }

  /**
   * Show the marker.
   *
   * @return {this}
   */
  show(): this {
    this.instance.show();

    return this;
  }

  /**
   * Make the marker instance.
   *
   * @param  {Position} position
   * @param  {object}   options
   * @return {this}
   */
  abstract make(position: Position, options: any): this;
}
