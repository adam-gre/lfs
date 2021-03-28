// React
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
     <Auth0Provider
      domain="lfs-vtc.eu.auth0.com"
      clientId="yiRxGytp4XLu84BLfcP1GH5UkEF8lgom"
      redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
