import { html } from 'lit';
import '../src/dave-card.js';

export default {
  title: 'DaveCard',
  component: 'dave-card',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <dave-card
      style="--dave-card-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </dave-card>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
