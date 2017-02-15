import { Request } from './request'
import { Resolver } from './resolver'

class SseRequest extends Request {
  /**
   * Dispatch request.
   *
   * @param {any} vehicles
   */
  dispatch(vehicles?: any): void {
    this.request.addEventListener('message', e => {
      let response = $.parseJSON(e.data);

      if (response.status == 200)
        this.locate(response.data);

      this.update(response.status);
    });
  }

  /**
   * Send request.
   */
  send() {
    this.update(304);
  }

  /**
   * Set request endpoint.
   *
   * @param  {options} options
   * @return {this}
   */
  to(options: any = {}): this {
    this.request = new window.EventSource(`${options.url}/event`);

    return this;
  }
}

export class Sse extends Resolver {
  /**
   * Make SSE request.
   *
   * @param {object} container
   * @param {object} options
   * @return {Request}
   */
  make(container: any, options: any = {}) {
    let request = new SseRequest(container);

    return request.to(options);
  }
}
