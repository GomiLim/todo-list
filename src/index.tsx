import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/scss/style.scss';
import App from './App';

import { PortalProvider } from 'context/PortalContext';

ReactDOM.render(
  <React.StrictMode>
    <PortalProvider>
      <App />
    </PortalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
