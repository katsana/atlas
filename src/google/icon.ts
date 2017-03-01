import { Canvas } from './canvas'
import { Icon as BaseIcon } from '../icon'
import { LabelContract } from '../contracts/label'
import { Marker } from './marker'
import { Position } from './position'
import { CustomMarker, CustomLabel } from './custom.js'

export class Icon extends BaseIcon implements LabelContract {
  /**
   * Custom label instance.
   *
   * @type {object}
   */
  protected _label: any;

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
    if (this.instance instanceof Marker)
      this.instance.addTo(canvas);
    else
      this.instance.setMap(Canvas.via(canvas));

    return this;
  }

  /**
   * Create a basic avatar.
   *
   * @param {object} options
   * @return {this}
   */
  createBasic(position: Position, options: any = {}) {
    // this.icon = L.mapbox.marker.icon({
    //   'marker-size': options.size ? options.size : 'large',
    //   'marker-symbol': options.label ? options.label : 'car',
    //   'marker-color': options.color ? options.color : '#fa0'
    // });

    // return this.generate(position, {
    //   className: options.className ? options.className : null,
    //   riseOnHover: options.riseOnHover ? options.riseOnHover : false
    // });

    return this;
  }

  /**
   * Create a HTML avatar.
   *
   * @param {object} options
   * @return {this}
   */
  createHtml(position: Position, options: any = {}) {
    this.instance = new CustomMarker(Position.via(position), {
      anchor: options.anchor,
      className: options.className ? options.className : null,
      html: options.html,
      size: options.size
    });

    return this;
  }

  /**
   * Create an image avatar.
   *
   * @param {object} options
   * @return {this}
   */
  createImage(position: Position, options: any = {}) {
    let anchor = new google.maps.Point(options.anchor[0], options.anchor[1]);
    let size = new google.maps.Size(options.size[0], options.size[1]);

    this.icon = {
      anchor,
      size,
      scaledSize: size,
      url: options.url
    };

    return this.make(position, {
    //   riseOnHover: options.riseOnHover ? options.riseOnHover : false
    });
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
    let marker;

    if (this.instance instanceof Marker)
      marker = this.instance.get();
    else
      marker = this.instance;

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
   * Make the marker instance.
   *
   * @param  {Position} position
   * @param  {object}   icon
   * @param  {object}   options
   * @return {Marker}
   */
  make(position: Position, options: any = {}): this {
    this.instance = new Marker(position, {
      icon: this.icon
    });

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
