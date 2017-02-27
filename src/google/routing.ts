import { Canvas } from './canvas'
import { Position } from './position'
import { Routing as Breadcrumb } from '../routing'

export class Routing extends Breadcrumb {
  /**
   * Add path to breadcrumb.
   *
   * @param {Position} position
   */
  addPath(position: Position) {
    this.polyline.getPath().push(Position.via(position));
  }

  /**
   * Add polyline to canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  addTo(canvas: Canvas): this {
    this.polyline.setMap(Canvas.via(canvas));

    return this;
  }

  /**
   * Center to current position.
   *
   * @param  {Position} position
   */
  centerTo(position: Position): this {
    if (this.avatar != null)
      this.avatar.moveTo(position);

    if (this.routing == 'follow')
      this.canvas.panTo(position);

    return this;
  }

  /**
   * Make polyline.
   *
   * @param  {object}  options
   * @return {object}
   */
  make(options: any): any {
    return new google.maps.Polyline({
      strokeColor: options.color ? options.color : '#78ACD9',
      strokeOpacity: options.opacity ? options.opacity : 1.0
    });
  }

  /**
   * Remove polyline from canvas.
   *
   * @param  {Canvas} canvas
   * @return {this}
   */
  removeFrom(canvas: Canvas): this {
    this.polyline.setMap(null);

    return this;
  }
}
