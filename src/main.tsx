import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {ConfirmedSupport} from './components/ConfirmedSupport.tsx';
import './index.css';

const isConfirmedPage = window.location.pathname.replace(/\/+$/, '') === '/confirmed';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isConfirmedPage ? <ConfirmedSupport /> : <App />}
  </StrictMode>,
);
