import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/multiple-choice/multiple-choice.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";

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
    //const address = `http://localhost:3000/api/sheet?search=insert`;
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

firstUpdated() {
  const multChoice = this.shadowRoot.querySelector('#mc9');
  if (multChoice) {
    multChoice.addEventListener('click', async () => {
      const results = await this._postxAPIStatement();
      console.log(results); // Handle the results here
    });
  }
}
render() {
  return html`
    <multiple-choice id="mc9" correct-text="You got a meal deal" incorrect-text="You did not get a meal deal...." hide-title="" answers="[{&quot;label&quot;: &quot;Option 1&quot;, &quot;correct&quot;: true},{&quot;label&quot;: &quot;Option 2&quot;, &quot;correct&quot;: true},{&quot;label&quot;: &quot;Option 3&quot;, &quot;correct&quot;: true},{&quot;label&quot;: &quot;Option 4 is not right&quot;, &quot;correct&quot;: false}]"></multiple-choice>
`;
}
}

customElements.define('dave-card', DaveCard);