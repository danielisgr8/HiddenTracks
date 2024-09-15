import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => <h1>Hello</h1>;

const rootEl = document.getElementById('root');
if (rootEl === null) throw new Error('Root element does not exist');
const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
