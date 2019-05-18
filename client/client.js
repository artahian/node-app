import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// mocks
window.analytics = {
  page() {},
  track() {},
  identify() {},
  group() {}
};

window.addEventListener('load', () => {
  ReactDOM.render(React.createElement(App), document.getElementById('root'));
});
