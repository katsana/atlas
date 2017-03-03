import { Canvas as Map } from '../canvas'
import { Position } from '../position'

var _ = require('underscore');

export class Canvas extends Map {
  /**
   * Get canvas service.
   *
   * @type {string}
   */
  protected service: string = 'google'

  /**
   * Make the map instance.
   *
   * @param {string} id
   * @param {object} options
   */
  make(id: string, options: any = {}): void {
    let atlas = options.atlas ? options.atlas : {};

    let config = {
      zoom: atlas.zoom ? atlas.zoom : 7,
      center: {lat: 3.161907, lng: 101.617954},
      mapTypeId: atlas.mapTypeId ? atlas.mapTypeId : google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ['roadmap', 'satellite'],
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      minZoom: atlas.minZoom ? atlas.minZoom : 7
    };

    return new google.maps.Map(document.getElementById(id), _.extend(config, options.canvas));
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

      let zoom = map.getZoom() ? map.getZoom() : 9;
      if (zoom < 10)
        zoom = 16;

      map.setZoom(zoom);
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
      if (zoom == null)
        zoom = map.getZoom() ? map.getZoom() : 9;
      if (zoom < 10)
        zoom = 16;

      map.setCenter(Position.via(position));
      map.setZoom(zoom);
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
