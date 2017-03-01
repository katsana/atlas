export interface LabelContract {
  /**
   * Add label to marker.
   *
   * @param  {string} text
   * @param  {object} options
   * @return {this}
   */
  label(text: string, options: any): this;

  /**
   * Hide the marker label.
   *
   * @return {this}
   */
  hideLabel(): this;

  /**
   * Show the marker label.
   *
   * @return {this}
   */
  showLabel(): this;
}
