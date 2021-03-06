import { Avatar } from './avatar'
import { Canvas } from './canvas'
import { Group } from './group'
import { Icon } from './icon'
import { Marker } from './marker'
import { Position } from './position'
import { Routing } from './routing'
import { Service } from '../service'
import { Timeline } from './timeline'

export class Google extends Service {
  /**
   * Access token.
   *
   * @return {string}
   */
  accessToken(): string {
    return this.options.apiKey;
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
  newCanvas(id: string, options: any = {}): Canvas {
    let config = this.options.canvas ? this.options.canvas : {};

    return new Canvas(id, { canvas: config, atlas: options });
  }

  /**
   * Add feature group to canvas.
   *
   * @param  {Canvas} canvas
   * @return {any}
   */
  newFeatureGroup(canvas: Canvas): any {
    return new Group(canvas);
  }

  /**
   * Construct new icon.
   *
   * @return {Icon}
   */
  newIcon(): Icon {
    return new Icon();
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
    return new Position(latitude, longitude, {accessToken: this.accessToken()});
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
   * @return string
   */
  get name(): string {
    return 'google'
  }
}
