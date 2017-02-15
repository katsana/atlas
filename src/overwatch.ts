import { Request } from './request'
import _ from 'lodash'

export abstract class Overwatch {
  protected breadcrumb: any;
  protected beacons: any;
  protected request: Request;

  /**
   * Add a beacon.
   *
   * @param  {any}  beacon
   * @return {this}
   */
  add(beacon: any): this {
    this.beacons[beacon.imei] = beacon;

    return this;
  }

  has(beacon): boolean {
    return _.has(this.beacons, beacon.imei);
  }

  is(beacon): boolean {
    return this.vue.$get('vehicle.imei') == beacon.imei;
  }

  get current(): any {
    return this.vue.$get('vehicle');
  }

  set current(beacon) {
    this.vue.$set('vehicle', beacon);
    this.add(beacon);
    this.load(beacon);
  }

  abstract locate(ping): void;

  abstract update(status: number): void;
}
