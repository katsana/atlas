import { GoogleService } from './google/service'
import { MapboxService } from './mapbox/service'
import { Position } from './generic/position'
import { Service } from './service'

let config = {
  google: {},
  mapbox: {}
};

class Atlas {
  /**
   * The service.
   *
   * @type {Service}
   */
  protected service: Service;

  /**
   * Construct a new class.
   *
   * @param {string} service
   */
  constructor(service: string) {
    if (service == 'google') {
      this.service = this.registerGoogleService();
    } else if (service == 'mapbox') {
      this.service = this.registerMapboxService();
    }
  }

  /**
   * Get current service.
   *
   * @return {Service}
   */
  driver(): Service {
    return this.service;
  }

  /**
   * Create new position.
   *
   * @param  {number}   latitude
   * @param  {number}   longitude
   * @return {Position}
   */
  newPosition(latitude: number, longitude: number): Position {
    return new Positin(latitude, longitude);
  }

  /**
   * Register google service.
   *
   * @return {MapboxService}
   */
  private registerGoogleService(): GoogleService {
    return new GoogleService(config.google);
  }

  /**
   * Register mapbox service.
   *
   * @return {MapboxService}
   */
  private registerMapboxService(): MapboxService {
    return new MapboxService(config.mapbox);
  }

  /**
   * Attach configuration.
   *
   * @param {any} options [description]
   */
  static config(options: any) {
    config = _.extend(config, options);
  }
}

module.exports = Atlas;
