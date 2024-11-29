import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material"
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import theme from './app/MaterialTheme';
import { BrowserRouter as Router } from "react-router-dom"
import ContextProvider from './app/context/ContextProvider';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Router>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
