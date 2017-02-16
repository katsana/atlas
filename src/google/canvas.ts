import { Canvas as Map } from '../canvas'
import { Position } from '../position'
import _ from 'lodash'

export class Canvas extends Map {
  /**
   * Make the map instance.
   *
   * @param {string} id
   * @param {object} options
   */
  make(id: string, options: any): void {
    let config = {
      zoom: options.zoom ? options.zoom : 7,
      center: {lat: -34.397, lng: 150.644},
      mapTypeId: 'satellite'
    };

    return new google.maps.Map(document.getElementById(id), _.extend(config));
  }

  /**
   * Bound map to.
   *
   * @param {object} bounds
   * @return {this}
   */
  boundTo(bounds: any): this {
    return this.pipe(function(map) {
      map.fitBounds(bounds);
    });
  }

  /**
   * Center map to.
   *
   * @param {Position} position
   * @param {number}   zoom
   * @return {this}
   */
  centerTo(position: Position, zoom?: number): this {
    return this.pipe(function(map) {
      map.setCenter(Position.via(position));
    });
  }

  /**
   * Pan map to.
   *
   * @param {Position} position
   * @return {this}
   */
  panTo(position: Position): this {
    return this.pipe(function(map) {
      map.panTo(Position.via(position));
    });
  }
}
