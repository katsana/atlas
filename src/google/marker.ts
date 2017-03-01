import { Canvas } from './canvas'
import { LabelContract } from '../label'
import { Marker as BaseMarker } from '../marker'
import { PopupContract } from '../popup'
import { Position } from './position'
import { CustomLabel } from './custom.js'

var _ = require('underscore');

export class Marker extends BaseMarker implements LabelContract, PopupContract {
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
   * Make a marker.
   *
   * @param  {object} position
   * @param  {object} options
   * @return {object}
   */
  make(position: any, options: any = {}): any {
    let marker = new google.maps.Marker({
      icon: options.icon ? options.icon : ''
      //riseOnHover: options.riseOnHover ? options.riseOnHover : true
    });

    marker.setPosition(Position.via(position));

    return marker;
  }

  /**
   * Add marker to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  addTo(canvas: Canvas): this {
    this.instance.setMap(Canvas.via(canvas))

    return this;
  }

  /**
   * Add label to marker.
   *
   * @param  {string} text
   * @param  {object} options
   * @return {this}
   */
  label(text: string, options: any = {}): this {
    let marker = this.instance.get();

    this._label = new CustomLabel({
      marker,
      text,
      className: 'leaflet-label'
    });

    this._label.setMap(marker.getMap());

    google.maps.event.addListener(marker, 'mouseover', () => {
      if (!this.forceShown)
        this.showLabel();
    });

    google.maps.event.addListener(marker, 'mouseout', () => {
      if (!this.forceShown)
        this.hideLabel();
    });

    return this;
  }

  /**
   * Hide the marker.
   *
   * @return {this}
   */
  hide(): this {
    this.instance.setVisible(false);

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
   * Move marker to position.
   *
   * @param  {Position} position
   * @return {this}
   */
  moveTo(position: Position): this {
    this.instance.setPosition(Position.via(position));

    return this;
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

    this.instance.get().addListener('click', () => this.showPopup());

    return this;
  }

  /**
   * Remove the marker from canvas.
   *
   * @param {Canvas} canvas
   * @return {this}
   */
  removeFrom(canvas: Canvas): this {
    this.instance.setMap(null);

    return this;
  }

  /**
   * Set popup content.
   *
   * @param {string} content
   */
  setPopupContent(content: string): this {
    if (this._popup)
      this._popup.setContent(content);

    return this;
  }

  /**
   * Show the marker.
   *
   * @return {this}
   */
  show(): this {
    this.instance.setVisible(true);

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
    let marker = this.instance.get();

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

  /**
   * Get position of marker.
   *
   * @return {Position}
   */
  get position(): Position {
    let coordinate = this.instance.getPosition();

    return new Position(coordinate.lat, coordinate.lng);
  }
}
