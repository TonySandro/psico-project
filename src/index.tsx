import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/AppTheme';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
