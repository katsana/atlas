import { Canvas } from './canvas'
import { Icon as BaseIcon } from '../icon'
import { LabelContract } from '../label'
import { Marker } from './marker'
import { PopupContract } from '../popup'
import { Position } from './position'
import { CustomMarker, CustomLabel } from './custom.js'

export class Icon extends BaseIcon implements LabelContract, PopupContract {
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
    let label = { color: 'white', text: '!' };

    if (_.isObject(options.label))
      label = _.extend(label, options.label);
    else
      label = _.extend(label, { text: options.label })

    let icon = {
      labelOrigin: new google.maps.Point(0, -25),
      path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
      fillColor: options.color ? options.color : '#fa0',
      fillOpacity: 1,
      strokeColor: '',
      strokeWeight: 0
    };

    if (_.isObject(options.icon))
      icon = options.icon

    this.instance = new google.maps.Marker({
      label,
      position: Position.via(position),
      icon
    });

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
    let marker;

    this._popup = new google.maps.InfoWindow({ content });

    if (this.instance instanceof Marker)
      marker = this.instance.get();
    else
      marker = this.instance;

    marker.addListener('click', () => this.showPopup());

    if (options.showPopup == true)
      this.showPopup();

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
    let marker;

    if (this.instance instanceof Marker)
      marker = this.instance.get();
    else
      marker = this.instance;

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
