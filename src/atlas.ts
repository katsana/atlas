import { Google } from './google/service'
import { Mapbox } from './mapbox/service'
import { Position } from './generic/position'
import { Service } from './service'
import _ from 'lodash'

var config = {
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
