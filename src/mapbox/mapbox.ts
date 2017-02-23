import { Avatar } from './avatar'
import { Canvas } from './canvas'
import { Icon } from './icon'
import { Marker } from './marker'
import { Position } from './position'
import { Routing } from './routing'
import { Service } from '../service'
import { Theme } from './theme'
import { Timeline } from './timeline'

var L = require('mapbox.js');

export class Mapbox extends Service {
  /**
   * Theme instance.
   *
   * @type {Theme}
   */
  protected theme: Theme;

  /**
   * Construct a new class.
   *
   * @param {object} options
   */
  constructor(options: any) {
    super(options);

    this.theme = new Theme(options.styles ? options.styles : {});
  }

  /**
   * Access token.
   *
   * @return {string}
   */
  accessToken(): string {
    return this.options.accessToken;
  }

  /**
   * Construct new avatar.
   *
   * @param  {object} vehicle
   * @param  {object} options
   * @return {Avatar}
   */
  newAvatar(vehicle: any, options: any): Avatar {
    return new Avatar(vehicle, options);
  }

  /**
   * Construct a new canvas.
   *
   * @param  {string} id
   * @param  {object} options
   * @return {Canvas}
   */
  newCanvas(id: string, options: any): Canvas {
    return new Canvas(id, options, this.theme);
  }

  /**
   * Add feature group to canvas.
   *
   * @param  {Canvas} canvas
   * @return {any}
   */
  newFeatureGroup(canvas: Canvas): any {
    return L.featureGroup().addTo(Canvas.via(canvas));
  }

  /**
   * Construct new icon.
   *
   * @param {string} label
   * @param {string} color
   * @param {string} size
   * @return {Icon}
   */
  newIcon(label: string, color?: string, size?: string): Icon {
    return new Icon(label, color, size);
  }

  /**
   * Construct new marker.
   *
   * @param  {Position} position
   * @param  {object}   options
   * @return {Marker}
   */
  newMarker(position: Position, options: any): Marker {
    return new Marker(position, options);
  }

  /**
   * Construct a new position.
   *
   * @param  {number}   latitude
   * @param  {number}   longitude
   * @return {Position}
   */
  newPosition(latitude: number, longitude: number): Position {
    let options = {
      accessToken: this.accessToken(),
      style: this.theme.active
    };

    return new Position(latitude, longitude, options);
  }

  /**
   * Construct new routing.
   *
   * @param {Canvas} canvas
   * @param {object} options
   * @return {Routing}
   */
  newRouting(canvas: Canvas, options?: any): Routing {
    return new Routing(canvas, options);
  }

  /**
   * Construct new timeline.
   *
   * @param {Canvas} canvas
   * @param {object} options
   * @param {object} position
   * @return {Timeline}
   */
  newTimeline(canvas: Canvas, options?: any, position?: any): Timeline {
    return new Timeline(canvas, options, position);
  }

  /**
   * Get service name.
   *
   * @return {string}
   */
  get name(): string {
    return 'mapbox'
  }
}
