import { Listener } from './listener'
import { Overwatch } from '../overwatch'

class Request extends Listener {
  /**
   * Dispatch request.
   *
   * @param {any} beacons
   */
  dispatch(beacons?: any): void {
    this.request.addEventListener('message', e => {
      let response = $.parseJSON(e.data)

      if (response.status == 200)
        this.locate(response.data)

      this.update(response.status)
    })
  }

  /**
   * Send request.
   */
  send() {
    this.update(304)
  }

  /**
   * Set request endpoint.
   *
   * @param  {string} url
   * @return {this}
   */
  to(url: string): this {
    this.request = new window.EventSource(`${url}/event`);

    return this;
  }
}

export class Sse {
  /**
   * Make SSE request.
   *
   * @param {Overwatch} container
   * @param {string}    url
   */
   make(container: Overwatch, url: string) {
    let request = new Request(container);

    return request.to(url);
  }
}
