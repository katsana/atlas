import { Canvas } from './canvas'

export class Group {
  /**
   * Group boundaries.
   *
   * @type {any}
   */
  protected boundaries: any;

  /**
   * Construct a new class.
   *
   * @param {Canvas} canvas
   */
  constructor(protected canvas: Canvas) {
    this.boundaries = new google.maps.LatLngBounds();
  }

  addLayer(polyline: any): void {
    polyline.getPath().forEach((item, index) => {
      this.boundaries.extend(new google.maps.LatLng(item.lat(), item.lng()));
    });
  }

  getBounds(): any {
    return this.boundaries;
  }
}
