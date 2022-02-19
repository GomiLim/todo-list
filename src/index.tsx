import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/scss/style.scss';
import App from './App';

import { ModalProvider } from 'context/ModalContext';

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
