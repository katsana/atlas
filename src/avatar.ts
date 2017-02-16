import { Icon } from './icon'

const colors = {
  'moving': '#04998B',
  'stopped': '#C14040',
  'idle': '#808080'
};

export abstract class Avatar extends Icon {
  /**
   * Construct a new class.
   *
   * @param {object} vehicle
   * @param {object} options
   */
  constructor(protected vehicle: any, options: any) {
    super();

    this.icon = this.makeIcon(options);
  }

  /**
   * Update state.
   *
   * @param  {string} state
   * @return {this}
   */
  update(state: string): this {
    let id = this.vehicle.id;

    let container = document.getElementById(`avatar-icon-${id}`)

    if (container) {
      let pin = container.contentDocument.getElementById('pin');

      if (pin) {
        pin.style.fill = colors[state];
      }
    }

    return this;
  }

  /**
   * Make icon for marker.
   *
   * @param  {object} options
   * @return {object}
   */
  abstract makeIcon(options: any): any;
}
