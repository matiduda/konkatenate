import React from 'react'
import ReactDOM from 'react-dom/client'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import { StompProvider } from './useStomp/Provider.tsx';
import App, { SERVER_STOMP_URL } from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme style={{ minHeight: 0 }} accentColor='red'>
      <BrowserRouter>
        <StompProvider config={{ brokerURL: SERVER_STOMP_URL }}>
          <App />
        </StompProvider>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
)
