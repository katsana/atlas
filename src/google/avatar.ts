import { Canvas } from './canvas'
import { Avatar as BaseAvatar } from '../avatar'
import { Marker } from './marker'
import { Position } from './position'
import { CustomMarker, CustomLabel } from './custom.js'

export class Avatar extends BaseAvatar {

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
   * Custom label instance.
   *
   * @type {object}
   */
  protected _label: any;

  /**
   * Add icon to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  addTo(canvas: Canvas): this {
    this.instance.setMap(Canvas.via(canvas));

    return this;
  }

  /**
   * Hide the label.
   *
   * @return {this}
   */
  hideLabel(): this {
    if (this._label) {
      this.labelShown = false;
      this._label.hide();
    }

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
    this._label = new CustomLabel({
      marker: this.instance,
      text,
      className: 'leaflet-label'
    });

    this._label.setMap(this.instance.getMap());

    google.maps.event.addListener(this.instance, 'mouseover', () => {
      if (!this.forceShown)
        this.showLabel();
    });

    google.maps.event.addListener(this.instance, 'mouseout', () => {
      if (!this.forceShown)
        this.hideLabel();
    });

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
  make(position: Position, options: any): this {
    this.instance = new CustomMarker(
      Position.via(position),
      _.extend(this.icon, options)
    );

    return this
  }

  /**
   * Make icon for marker.
   *
   * @param  {object} options
   * @return {object}
   */
  makeIcon(options: any): any {
    return {
      anchor: [22.5, 45],
      size: [45, 45],
      className: 'leaflet-avatar-icon',
      html: `<object id="avatar-icon-${this.vehicle.id}" type="image/svg+xml" data="${options.url}"></object>`
    };
  }

  /**
   * Show the label.
   *
   * @return {this}
   */
  showLabel(): this {
    if (this._label) {
      this.labelShown = true;
      this._label.show();
    }

    return this;
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
}
