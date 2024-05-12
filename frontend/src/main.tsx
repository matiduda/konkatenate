import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import { StompProvider } from './useStomp/Provider.tsx';

const SERVER_STOMP_URL = "ws://localhost:8080/ws";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Theme>
        {/* TODO: Move stomp stuff to a separate game page */}
        <StompProvider config={{ brokerURL: SERVER_STOMP_URL }}>
          <App />
        </StompProvider>
      </Theme>
    </BrowserRouter>
  </React.StrictMode>
)
