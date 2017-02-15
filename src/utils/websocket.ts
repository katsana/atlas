import { Request } from './request'
import { Resolver } from './resolver'
import io from 'socket.io-client'

class WebsocketRequest extends Request {
  /**
   * JWT token.
   *
   * @type {string}
   */
  private token: string;

  /**
   * Dispatch request.
   *
   * @param {any} vehicles
   */
  dispatch(vehicles?: any): void {
    this.request.on('connect', () => {
      this.request.on('authenticated', () => {
        for (const vehicle of vehicles) {
          this.request.on('track:' + vehicle.imei, response => {
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
  to(options: any = {}): this {
    this.token = options.token;
    this.request = io(`${options.websocket}`);
    // `${location.protocol}//${location.hostname}:${vue.config.websocketPort}`

    return this;
  }
}

export class Websocket extends Resolver {
  /**
   * Make websocket request.
   *
   * @param {object} container
   * @param {object} options
   * @return {Request}
   */
  make(container: any, options: any = {}) {
    let request = new WebsocketRequest(container);

    return request.to(options);
  }
}
