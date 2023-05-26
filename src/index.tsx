import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={baseUrl || ''}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

