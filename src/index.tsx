import './index.css';

import App from 'App';
import {WebinarProvider} from 'context/WebinarContext';
import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * Renders the root React component into the DOM.
 *
 * @function
 */
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Rendering the application wrapped in the WebinarProvider context and React's StrictMode
root.render(
  <React.StrictMode>
    <WebinarProvider>
      <App />
    </WebinarProvider>
  </React.StrictMode>,
);
