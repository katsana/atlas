import { Google } from './google/service'
import { Mapbox } from './mapbox/service'
import { Position } from './generic/position'
import { Service } from './service'
import _ from 'underscore'

class Atlas {
  /**
   * List of configuration.
   *
   * @type {object}
   */
  static config: any = {
    google: {},
    mapbox: {}
  };

  /**
   * List of registered services.
   *
   * @type {object}
   */
  protected drivers: any = {};
  /**
   * Construct a new class.
   *
   * @param {string} service
   * @return {Service}
   */
  protected createDriver(service: string): Service {
    if (service == 'google') {
      return this.registerGoogleService();
    } else if (service == 'mapbox') {
      return this.registerMapboxService();
    }

    throw new Error(`Service: [${service}] is not available`);
  }

  /**
   * Get current service.
   *
   * @return {Service}
   */
  driver(service: string): Service {
    if (this.drivers[service] !== null) {
      console.log(`Building driver for ${service}`);
      this.drivers[service] = this.createDriver(service);
    }

    return this.drivers[service];
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
  private registerMapboxService(): Mapbox {
    return new Mapbox(config.mapbox);
  }

  /**
   * Attach configuration.
   *
   * @param {any} options [description]
   */
  static config(options: any) {
    Atlas.config = _.extend(Atlas.config, options);
  }

  /**
   * Create new position.
   *
   * @param  {number}   latitude
   * @param  {number}   longitude
   * @return {Position}
   */
  static newPosition(latitude: number, longitude: number): Position {
    return new Position(latitude, longitude);
  }
}

module.exports = Atlas;
