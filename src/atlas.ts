import { Google } from './google/google'
import { Mapbox } from './mapbox/mapbox'
import { Position } from './generic/position'
import { Service } from './service'

var _ = require('underscore');

class Atlas {
  /**
   * List of configuration.
   *
   * @type {object}
   */
  static _config: any = {
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

    throw new Error(`Driver [${service}] is not available.`);
  }

  /**
   * Get current service.
   *
   * @return {Service}
   */
  driver(service: string): Service {
    if (this.drivers[service] !== null) {
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
    return new Google(Atlas._config.google);
  }

  /**
   * Register mapbox service.
   *
   * @return {Mapbox}
   */
  private registerMapboxService(): Mapbox {
    return new Mapbox(Atlas._config.mapbox);
  }

  /**
   * Attach configuration.
   *
   * @param {any} options
   */
  static config(options: any) {
    Atlas._config = _.extend(Atlas._config, options);
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
