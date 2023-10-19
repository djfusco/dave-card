import { LitElement, html, css } from 'lit';

export class DaveCard extends LitElement {
  static properties = {
    version: {},
  };


  static get styles() {
    return css`
      :host {
        font-size: 2em;
      }
    `;
  }

  constructor() {
    super();
    this.version = 'STARTING';
  }

  render() {
    return html`
    <p>This is the ${this.version} code new.</p>
    `;
  }
}

customElements.define('dave-card', DaveCard);