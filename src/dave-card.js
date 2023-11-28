import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/multiple-choice/multiple-choice.js";

export class DaveCard extends LitElement {
  static get properties() {
    return {
      version: { type: String }
    }
  }

  static get styles() {
    return css`
      :host {
        font-size: 2em;
      }
    `;
  }

  constructor() {
    super();
    this.version = null;
  }

  async _postxAPIStatement(e) {
    console.log(e.detail);
    let base = ''; 
    if (
      window.location.origin.startsWith("http://127.0.0.1") ||
      window.location.origin.startsWith("http://localhost")
    ) {
      base = window.location.origin
        .replace(/127.0.0.1:8(.*)/, "localhost:3000")
        .replace(/localhost:8(.*)/, "localhost:3000");
    }
    return await fetch(`${base}/api/sheet?search=insert`).then((r) => r.ok ? r.json() : []).then((data) => {
      return data;
    });
  }

  render() {
    return html`
      <multiple-choice
        correct-text="You got a meal deal"
        incorrect-text="You did not get a meal deal...."
        hide-title
        @user-engagement="${this._postxAPIStatement}"
        >
        <input type="checkbox" value="Option 1 - Correct answer" correct>
        <input type="checkbox" value="Option 2">
        <input type="checkbox" value="Option 3">
        <input type="checkbox" value="Option 4">
      </multiple-choice>
    `;
  }
}

customElements.define('dave-card', DaveCard);