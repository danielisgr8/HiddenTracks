import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const rootEl = document.getElementById('root');
if (rootEl === null) throw new Error('Root element does not exist');
const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
