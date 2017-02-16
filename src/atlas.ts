import { Google } from './google/service'
import { Mapbox } from './mapbox/service'
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
      this.service = this.registerGoogle();
    } else if (service == 'mapbox') {
      this.service = this.registerMapbox();
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
   * @return {Google}
   */
  private registerGoogleService(): Google {
    return new Google(config.google);
  }

  /**
   * Register mapbox service.
   *
   * @return {Mapbox}
   */
  private registerMapbox(): Mapbox {
    return new Mapbox(config.mapbox);
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
