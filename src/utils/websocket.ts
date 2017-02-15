import { Listener } from './listener'
import { Overwatch } from '../overwatch'
import io from 'socket.io-client'

class Request extends Listener {
  /**
   * JWT token.
   *
   * @type {string}
   */
  private token: string;

  /**
   * Dispatch request.
   *
   * @param {any} beacons
   */
  dispatch(beacons?: any): void {
    this.request.on('connect', () => {
      this.request.on('authenticated', () => {
        for (const beacon of beacons) {
          this.request.on('track:' + beacon.imei, response => {
            if (response.status == 200)
              this.locate(response.data)

            this.update(response.status)
          })
        }
      })
      .emit('authenticate', {token: this.token});
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
    let vue = this.container.vue;

    this.token = vue.token;
    this.request = io(`${location.protocol}//${location.hostname}:${vue.config.websocketPort}`);

    return this;
  }
}

export class Websocket {
  /**
   * Make websocket request.
   *
   * @param {Overwatch} container
   * @param {string}    url
   */
  make(container: Overwatch, url: string) {
    let request = new Request(container);

    return request.to(url);
  }
}
