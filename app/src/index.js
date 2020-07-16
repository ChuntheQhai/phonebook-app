import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import { SnackbarContainer } from 'uno-material-ui';
import { store } from "./redux";
import App from './App';


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

console.log('react process env: ', process.env)

ReactDOM.render(
  <Provider store={store}>
    <ModalProvider rootComponent={TransitionGroup}>
      <ThemeProvider theme={theme}>
        <SnackbarContainer/>
        <App />
      </ThemeProvider>
    </ModalProvider>
  </Provider>,
  document.getElementById("root")
);
