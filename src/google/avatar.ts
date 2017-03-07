import { Canvas } from './canvas'
import { Avatar as BaseAvatar } from '../avatar'
import { LabelContract } from '../label'
import { Marker } from './marker'
import { PopupContract } from '../popup'
import { Position } from './position'
import { CustomMarker, CustomLabel } from './custom.js'

export class Avatar extends BaseAvatar implements LabelContract, PopupContract {
  /**
   * Custom label instance.
   *
   * @type {object}
   */
  protected _label: any;

  /**
   * Custom popup instance.
   *
   * @type {object}
   */
  protected _popup: any;

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
   * Hide the marker label.
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
   * Move icon to position.
   *
   * @param  {Position} position
   * @return {this}
   */
  moveTo(position: Position): this {
    if (this._label)
      this._label.setPosition(Position.via(position));

    return super.moveTo(position);
  }

  /**
   * Add popup for marker.
   *
   * @param  {string} content
   * @param  {object} options
   * @return {this}
   */
  popup(content: string, options: any): this {
    this._popup = new google.maps.InfoWindow({ content });

    this.instance.addListener('click', () => this.showPopup());

    return this;
  }

  /**
   * Set popup content.
   *
   * @param {string} content
   * @return {this}
   */
  setPopupContent(content: string): this {
    if (this._popup)
      this._popup.setContent(content);

    return this;
  }

  /**
   * Show the marker label.
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
   * Show popup.
   *
   * @return {this}
   */
  showPopup(): this {
    let marker = this.instance;

    if (this._popup)
      this._popup.open(marker.getMap(), marker);

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
