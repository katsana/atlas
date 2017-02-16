import { Position } from './position'

export abstract class Imagery {
  /**
   * Construct a new class.
   *
   * @param {object} options
   */
  constructor(protected options: any = {}) {
    //
  }

  /**
   * Get position URL.
   *
   * @param  {Position} position
   * @return {string}
   */
  url(position: Position = null): string {
    if (position instanceof Position)
      return position.url;

    return '#';
  }

  /**
   * Get position static map.
   *
   * @param  {Position} position
   * @param  {string}   dimension
   * @param  {number}   zoom
   * @return {string}
   */
  image(position: Position = null, dimension: string = '400x400', zoom: number = 13): string {
    if (position instanceof Position)
      return position.image(dimension, zoom);

    return '';
  }
}
