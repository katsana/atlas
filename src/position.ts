/**
 * Convert to radian.
 * @param  {number} value [description]
 * @return {number}       [description]
 */
function to_radian(value: number): number {
  return value * (Math.PI / 180);
};

export abstract class Position {
  /**
   * Construct a new class instance.
   *
   * @param {number} latitude
   * @param {number} longitude
   */
  constructor(protected latitude: number, protected longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Calculate distance in KM.
   *
   * @param {number} latitude
   * @param {number} longitude
   * @return {number}
   */
  distanceInKm(latitude: number, longitude: number): number {
    let dlat, dlng, lat1, lat2, a, c;

    dlat = to_radian(latitude - this.latitude);
    dlng = to_radian(longitude - this.longitude);
    lat1 = to_radian(this.latitude);
    lat2 = to_radian(latitude);

    a = Math.sin(dlat/2) * Math.sin(dlat/2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dlng/2) * Math.sin(dlng/2);

    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return 6371 * c;
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
   * @param  {object} position
   * @return {object}
   */
  static via(position: any) {
    if (position instanceof Position)
      return position.get()

    return position
  }

  /**
   * Get the static map image for position.
   *
   * @param  {string} dimension
   * @param  {number} zoom
   * @return {string}
   */
  abstract image(dimension: string, zoom: number): string;

  /**
   * Get the position.
   *
   * @return {object}
   */
  abstract get position(): any;

  /**
   * Get the service coordinate.
   *
   * @return {string}
   */
  abstract get serviceCoordinate(): string;
}
