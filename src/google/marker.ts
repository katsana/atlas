import { Canvas } from './canvas'
import { Marker as BaseMarker } from '../marker'
import { Position } from './position'

var _ = require('underscore');

export class Marker extends BaseMarker {
  /**
   * Make a marker.
   *
   * @param  {object} position
   * @param  {object} options
   * @return {object}
   */
  make(position: any, options: any = {}) {
    return new google.maps.Marker(position, {
      icon: options.icon ? options.icon : ''
      //riseOnHover: options.riseOnHover ? options.riseOnHover : true
    });
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
    // let config = {
    //   className: options.className ? options.className : '',
    //   clickable: options.clickable ? options.clickable : false,
    //   noHide: false
    // });

    // if (_.isFunction(this.instance.bindLabel)) {
    //   this.instance.bindLabel(text, config)
    //     .on('mouseover', (e) => {
    //       if (!this.forceShown)
    //         this.showLabel();
    //     })
    //     .on('mouseout', (e) => {
    //       if (!this.forceShown)
    //         this.hideLabel();
    //     });
    // }

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
   * Hide the label.
   *
   * @return {this}
   */
  hideLabel(): this {
    // this.instance.hideLabel();
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
    this.instance.setPosition(Position.via(position));

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
    // this.instance.bindPopup(text, options);

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
   * Show the marker.
   *
   * @return {this}
   */
  show(): this {
    this.instance.setVisible(true);

    return this;
  }

  /**
   * Show the marker.
   *
   * @return {this}
   */
  showLabel(): this {
    // this.instance.showLabel();
    this.labelShown = !this.labelShown;

    return this;
  }

  /**
   * Show popup.
   *
   * @return {this}
   */
  showPopup(): this {
    // this.instance.openPopup();

    return this;
  }

  /**
   * Set popup content.
   *
   * @param {string} content
   */
  setPopupContent(content: string): this {
    // this.instance.setPopupContent(content);

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
