import { Canvas } from './canvas'
import { LabelContract } from '../label'
import { Marker as BaseMarker } from '../marker'
import { PopupContract } from '../popup'
import { Position } from './position'

var L = require('mapbox.js');
var _ = require('underscore');

export class Marker extends BaseMarker implements LabelContract, PopupContract {
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
  make(position: any, options: any = {}) {
    return new L.Marker(position, {
      className: options.className ? options.className : '',
      icon: options.icon ? options.icon : new L.Icon.Default(),
      riseOnHover: options.riseOnHover ? options.riseOnHover : true
    });
  }

  /**
   * Add marker to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  addTo(canvas: Canvas): this {
    this.instance.addTo(Canvas.via(canvas))

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
    let config = {
      className: options.className ? options.className : '',
      clickable: options.clickable ? options.clickable : false,
      noHide: false
    };

    if (_.isFunction(this.instance.bindLabel)) {
      this.instance.bindLabel(text, config)
        .on('mouseover', (e) => {
          if (!this.forceShown)
            this.showLabel();
        })
        .on('mouseout', (e) => {
          if (!this.forceShown)
            this.hideLabel();
        });
    }

    return this;
  }

  /**
   * Hide the marker.
   *
   * @return {this}
   */
  hide(): this {
    this.instance.setOpacity(0);
    this.instance.setZIndexOffset(-1000);

    return this;
  }

  /**
   * Hide the label marker.
   *
   * @return {this}
   */
  hideLabel(): this {
    this.instance.hideLabel();
    this.labelShown = !this.labelShown;

    return this;
  }

  /**
   * Move marker to position.
   *
   * @param  {Position} position
   * @return {this}
   */
  moveTo(position: Position): this {
    this.instance.setLatLng(Position.via(position));

    return this;
  }

  /**
   * Add popup for marker.
   *
   * @param  {string} text
   * @param  {object} options
   * @return {this}
   */
  popup(text: string, options: any): this {
    this.instance.bindPopup(text, options);

    return this;
  }

  /**
   * Remove the marker from canvas.
   *
   * @param {Canvas} canvas
   * @return {this}
   */
  removeFrom(canvas: Canvas): this {
    Canvas.via(canvas).removeLayer(this.instance);

    return this;
  }

  /**
   * Show the marker.
   *
   * @return {this}
   */
  show(): this {
    this.instance.setOpacity(1);
    this.instance.setZIndexOffset(0);

    return this;
  }

  /**
   * Show the marker label.
   *
   * @return {this}
   */
  showLabel(): this {
    this.instance.showLabel();
    this.labelShown = !this.labelShown;

    return this;
  }

  /**
   * Show popup.
   *
   * @return {this}
   */
  showPopup(): this {
    this.instance.openPopup();

    return this;
  }

  /**
   * Set popup content.
   *
   * @param {string} content
   */
  setPopupContent(content: string): this {
    this.instance.setPopupContent(content);

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
    let coordinate = this.instance.getLatLng();

    return new Position(coordinate.lat, coordinate.lng);
  }
}
