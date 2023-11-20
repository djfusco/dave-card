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


  async _postxAPIStatement(e) {
    const address = `/api/sheet?search=insert`;
    const results = await fetch(address).then((response) => {
        if (response.ok) {
            return response.json()
        }
        return [];
    })
    .then((data) => {
        return data;
    });

    return results;
}


  render() {
    return html`
    <p>This is the ${this.version} code.</p>

    <button id="button1" onclick="_postxAPIStatement}">Click me Inside!</button>

    <button @value-changed="${this._postxAPIStatement}">Another<button>

    `;
  }
}

customElements.define('dave-card', DaveCard);