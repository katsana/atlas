import _ from 'underscore'

var styles = {};

export class Theme {
  /**
   * The theme name.
   *
   * @type {string}
   */
  private theme: string;

  /**
   * Construct a new class.
   *
   * @param {object} options
   */
  constructor(options: any = {}) {
    if (_.isEmpty(options)) {
      Theme.styles(options);
    }

    this.theme = this.make();
  }

  /**
   * Resolve the current theme name.
   *
   * @return {string}
   */
  make(): string {
    let theme;

    if (Store.has('mapbox-theme')) {
      theme = Store('mapbox-theme');
    }

    if (_.indexOf(_.keys(styles), theme) < 0) {
      return 'Street';
    }

    return theme;
  }

  /**
   * Get active theme.
   *
   * @return {string}
   */
  active(): string {
    return this.getThemeSchema(this.theme);
  }

  /**
   * Activate a theme.
   *
   * @param  {string} theme
   * @return {this}
   */
  activate(theme: string): this {
    Store('mapbox-theme', theme);
    this.theme = theme;

    return this;
  }

  /**
   * Get style.
   *
   * @param  {string} theme
   * @return {string}
   */
  getThemeSchema(theme: string): string {
    return styles[theme];
  }

  /**
   * Get active theme tile.
   *
   * @return {object}
   */
  activeTile(): any {
    return L.mapbox.tileLayer(this.theme);
  }

  /**
   * Get all theme tiles.
   *
   * @return {object}
   */
  tiles(): any {
    return _.mapObject(styles, (style) => {
      return L.mapbox.tileLayer(style);
    });
  }

  /**
   * Get current.
   *
   * @return {string}
   */
  get current(): string {
    return this.theme;
  }

  static styles(options: any): void {
    styles = _.extend(styles, options);
  }
}
