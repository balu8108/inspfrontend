import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme from "./constants/theme/theme";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastNotificationProvider } from "./components/toastNotificationProvider/ToastNotificationProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ToastNotificationProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ToastNotificationProvider>
    </ChakraProvider>
  </BrowserRouter>
);

reportWebVitals();
