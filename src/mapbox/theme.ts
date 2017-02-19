import _ from 'underscore'
import store from 'store2'

export class Theme {
  /**
   * List of theme styles.
   *
   * @type {object}
   */
  static _styles: any = {};

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

    if (store.has('mapbox-theme')) {
      theme = store('mapbox-theme');
    }

    if (_.indexOf(_.keys(Theme.styles), theme) < 0) {
      return 'Street';
    }

    return theme;
  }

  /**
   * Activate a theme.
   *
   * @param  {string} theme
   * @return {this}
   */
  activate(theme: string): this {
    store('mapbox-theme', theme);
    this.theme = theme;

    return this;
  }

  /**
   * Get style.
   *
   * @param  {string} theme
   * @return {string}
   */
  getThemeKey(theme: string): string {
    return Theme._styles[theme];
  }

  /**
   * Get all theme tiles.
   *
   * @return {object}
   */
  tiles(): any {
    return _.mapObject(Theme.styles, (style) => {
      return L.mapbox.tileLayer(style);
    });
  }

  /**
   * Get current theme name.
   *
   * @return {string}
   */
  get current(): string {
    return this.theme;
  }

  /**
   * Get active theme.
   *
   * @return {string}
   */
  get active(): string {
    return this.getThemeKey(this.theme);
  }

  /**
   * Get active theme tile.
   *
   * @return {object}
   */
  get activeTile(): any {
    return L.mapbox.tileLayer(this.active);
  }

  /**
   * Setup styles.
   *
   * @param {object} options
   */
  static styles(options: any): void {
    Theme._styles = _.extend(Theme._styles, options);
  }
}
