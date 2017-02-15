import { Request } from './request'

export abstract class Resolver {
  /**
   * Make the request.
   *
   * @param {object} container
   * @param {object} options
   * @return {Request}
   */
   abstract make(container: any, options: any = {}): Request;
}
