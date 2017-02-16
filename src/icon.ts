import { Canvas } from './canvas'
import { Marker } from './marker'
import { Position } from './position'

export abstract class Icon {
  /**
   * The icon instance.
   *
   * @type {Marker}
   */
  protected instance: Marker;

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
   * Get the marker instance.
   *
   * @return {Marker}
   */
  get(): Marker {
    return this.instance
  }

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
   * Make the marker instance.
   *
   * @param  {Position} position
   * @param  {object}   icon
   * @param  {object}   options
   * @return {Marker}
   */
  abstract make(position: Position, icon: any, options: any): Marker;
}
