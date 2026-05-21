import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './assets/styles/index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find root mount element.');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
