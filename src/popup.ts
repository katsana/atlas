export interface PopupContract {
  /**
   * Add popup for marker.
   *
   * @param  {string} text
   * @param  {object} options
   * @return {this}
   */
  popup(text: string, options: any): this;

  /**
   * Set popup content.
   *
   * @param {string} content
   * @return {this}
   */
  setPopupContent(content: string): this;

  /**
   * Show popup.
   *
   * @return {this}
   */
  showPopup(): this;
}
