export abstract class Position {
  /**
   * The latitude.
   *
   * @type {number}
   */
  protected latitude: number;

  /**
   * The longitude.
   *
   * @type {number}
   */
  protected longitude: number;

  /**
   * Construct a new class instance.
   *
   * @param {number} latitude
   * @param {number} longitude
   */
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude
    this.longitude = longitude
  }

  /**
   * Check if latitude and longitude are the same.
   *
   * @param  {number}  latitude
   * @param  {number}  longitude
   * @return {boolean}
   */
  isSame(latitude: number, longitude: number): boolean {
    return (this.latitude == latitude && this.longitude == longitude)
  }

  /**
   * Is the position valid.
   *
   * @return {boolean}
   */
  isValid(): boolean {
    return (this.latitude == null || this.longitude == null) !== true
  }

  /**
   * Get the position instance.
   *
   * @return {object}
   */
  get(): any {
    if (this.isValid())
      return this.position
  }

  /**
   * Get position coordinate.
   *
   * @return {string}
   */
  get coordinate(): string {
    return `${this.latitude},${this.longitude}`
  }

  /**
   * Get position URL.
   *
   * @return {string}
   */
  get url(): string {
    if (! this.isValid())
      return '#'

    return `http://maps.apple.com/?q=${this.latitude},${this.longitude}`
  }

  /**
   * Resolve instance of position.
   *
   * @param  {any} position
   * @return {any}
   */
  static via(position: any): any {
    if (position instanceof Position)
      return position.get()

    return position
  }

  /**
   * Get the position.
   *
   * @return {any}
   */
  abstract get position(): any;

  /**
   * Get the service coordinate.
   *
   * @return {string}
   */
  abstract get serviceCoordinate(): string;
}
