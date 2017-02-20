var L = require('mapbox.js');
var store = require('store2');
var _ = require('underscore');

export class Theme {
  /**
   * List of theme styles.
   *
   * @type {object}
   */
  protected styles: any = {};

  /**
   * The theme name.
   *
   * @type {string}
   */
  protected theme: string;

  /**
   * Construct a new class.
   *
   * @param {object} styles
   */
  constructor(styles: any = {}) {
    if (!_.isEmpty(styles)) {
      this.styles = styles;
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

    if (store.has('mapbox-theme'))
      theme = store('mapbox-theme');

    if (_.indexOf(_.keys(this.styles), theme) > -1)
      return theme;

    store('mapbox-theme', 'Street');

    return 'Street';
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
    return this.styles[theme];
  }

  /**
   * Get all theme tiles.
   *
   * @return {object}
   */
  tiles(): any {
    return _.mapObject(this.styles, function(style) {
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
}
