import { Request } from './request'
import { Resolver } from './resolver'

class AjaxRequest extends Request {
  /**
   * Request interval.
   *
   * @type {number}
   */
  protected interval: number = 5000;

  /**
   * Dispatch request.
   *
   * @param {any} beacons
   */
  dispatch(beacons?: any): void {
    Javie.on('Request.onComplete: katsana.beacon', (data, status, self) => {
      if (status == 200)
        this.locate(data);

      this.update(status);
    });

    this.queue();
  }

  /**
   * Send request.
   */
  send(): void {
    this.request.execute(this.container.current);
  }

  /**
   * Set request endpoint.
   *
   * @param  {object} options
   * @return {this}
   */
  to(options: any = {}): this {
    this.request = Javie.make('request', 'katsana.beacon');
    this.request.to(`GET ${options.url}/native`);

    return this;
  }
}

export class Ajax extends Resolver {
  /**
   * Make AJAX request.
   *
   * @param {object} container
   * @param {object} options
   * @return {Request}
   */
  make(container: any, options: any = {}) {
    let request = new AjaxRequest(container);

    return request.to(options);
  }
}
