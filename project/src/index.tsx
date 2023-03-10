import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components';

enum Setting {
  OffersCount = 65,
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offersCount={Setting.OffersCount} />
  </React.StrictMode>,
);
