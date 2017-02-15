import { Listener } from './listener'
import { Overwatch } from '../overwatch'

class Request extends Listener {
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
   * @param  {string} url
   * @return {this}
   */
  to(url: string): this {
    this.request = Javie.make('request', 'katsana.beacon');
    this.request.to(`GET ${url}/native`);

    return this;
  }
}

export class Ajax {
  /**
   * Make AJAX request.
   *
   * @param {Overwatch} container
   * @param {string}    url
   */
   make(container: Overwatch, url: string) {
    let request = new Request(container);

    return request.to(url);
  }
}
