import { Overwatch } from '../overwatch'

export abstract class Request {
  /**
   * Request interval.
   *
   * @type {number}
   */
  protected interval: number = 2000;

  /**
   * Interate count.
   *
   * @type {number}
   */
  protected iterate: number = 23;

  /**
   * Request instance.
   *
   * @type {any}
   */
  protected request: any;

  /**
   * Construct a new class.
   *
   * @param {Overwatch} container
   */
  constructor(protected container) {
    this.request = null;
  }

  /**
   * Locate a beacon.
   *
   * @param {any} data
   */
  locate(data: any): void {
    this.container.locate(data);
  }

  /**
   * Update status.
   *
   * @param {number = 200} status
   */
  update(status: number = 200): void {
    this.container.update(status);
  }

  /**
   * Queue a request.
   */
  queue(): void {
    setInterval(function () { this.send(); }, this.interval);
  }

  /**
   * Dispatch request.
   *
   * @param {any} beacons
   */
  abstract dispatch(beacons?: any): void;

  /**
   * Send request.
   */
  abstract send(): void;

  /**
   * Set request endpoint.
   *
   * @param  {object} options
   * @return {this}
   */
  abstract to(options: any): this;
}
