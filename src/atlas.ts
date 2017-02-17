import { Google } from './google/service'
import { Mapbox } from './mapbox/service'
import { Position } from './generic/position'
import { Service } from './service'
import _ from 'underscore'

var config = {
  google: {},
  mapbox: {}
};

var drivers = {};

class Atlas {
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
  }

  /**
   * Get current service.
   *
   * @return {Service}
   */
  driver(service: string): Service {
    if (_.isNull(drivers[service])) {
      drivers[service] = this.createDriver(service);
    }

    return drivers[service];
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
    config = _.extend(config, options);
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
