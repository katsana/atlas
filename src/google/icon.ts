import { Canvas } from './canvas'
import { Icon as BaseIcon } from '../icon'
import { Marker } from './marker'
import { Position } from './position'
import { CustomMarker } from './custom.js'

export class Icon extends BaseIcon {
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
      html: options.html,
      size: options.size
    });

    console.log(this.instance);

    return this;
  }

  /**
   * Create an image avatar.
   *
   * @param {object} options
   * @return {this}
   */
  createImage(position: Position, options: any = {}) {
    this.icon = {
      anchor: new google.maps.Point(options.anchor[0], options.anchor[1]),
      size: new google.maps.Size(options.size[0], options.size[1]),
      url: options.url
    };

    return this.make(position, {
    //   riseOnHover: options.riseOnHover ? options.riseOnHover : false
    });
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
}
