import { Avatar } from './avatar'
import { Canvas } from './canvas'
import { Icon } from './icon'
import { Marker } from './marker'
import { Position } from './position'
import { Routing } from './routing'
import { Timeline } from './timeline'

export abstract class Service {
  /**
   * Service options.
   *
   * @type {object}
   */
  protected options: any;

  /**
   * Construct a new class.
   *
   * @param {object} options
   */
  constructor(options: any = {}) {
    this.options = options;
  }

  /**
   * Construct new avatar.
   *
   * @param  {object} vehicle
   * @param  {object} options
   * @return {Avatar}
   */
  abstract newAvatar(vehicle: any, options: any): Avatar;

  /**
   * Construct a new canvas.
   *
   * @param  {string} id
   * @param  {object} options
   * @return {Canvas}
   */
  abstract newCanvas(id: string, options: any): Canvas;


  /**
   * Add feature group to canvas.
   *
   * @param  {Canvas} canvas
   * @return {any}
   */
  abstract newFeatureGroup(canvas: Canvas): any;

  /**
   * Construct new icon.
   *
   * @param {string} label
   * @param {string} color
   * @param {string} size
   * @return {Icon}
   */
  abstract newIcon(label: string, color?: string, size?: string): Icon;

  /**
   * Construct new marker.
   *
   * @param  {Position} position
   * @param  {object}   options
   * @return {Marker}
   */
  abstract newMarker(position: Position, options: any): Marker;

  /**
   * Construct a new position.
   *
   * @param  {number}   latitude
   * @param  {number}   longitude
   * @return {Position}
   */
  abstract newPosition(latitude: number, longitude: number): Position;

  /**
   * Construct new routing.
   *
   * @param {Canvas} canvas
   * @param {object} options
   * @return {Routing}
   */
  abstract newRouting(canvas: Canvas, options?: any): Routing;

  /**
   * Construct new timeline.
   *
   * @param {Canvas} canvas
   * @param {object} options
   * @param {object} position
   * @return {Timeline}
   */
  abstract newTimeline(canvas: Canvas, options?: any, position?: any): Timeline;

  /**
   * Get service name.
   *
   * @return string
   */
  abstract get name(): string;
}
