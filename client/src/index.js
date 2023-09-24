import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./features/user";
import themeReducer from "./features/theme";
import productReducer from "./features/product";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { questrial } from "@fontsource/questrial"; // Import the Questrial font
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

// Create a redux-persist store
const persistConfig = {
  key: "root",
  storage,
};

// Combine the reducers
const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  theme: themeReducer,
  product: persistReducer(persistConfig, productReducer),
});

// Create the redux store
const store = configureStore({
  reducer: rootReducer,
});

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  purple: {
    900: "#6c0191",
    700: "#8e0fba",
    500: "#B25AD0",
    400: "#b774cf",
    300: "#bb8bcc",
    200: "#c09dcc",
  },
  green: {
    500: "#918e6d", // Define the new color with the desired shade
  },
  sage: {
    200: "#D4D0A5",
  },
};

const container = {
  baseStyle: {
    maxWidth: "4xl",
  },
};

const heading = {
  baseStyle: {
    my: "10px",
    p: "30px",
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    body: "Questrial, sans-serif", // Use Questrial font as the default body font
    heading: "Questrial, sans-serif", // Use Questrial font as the default heading font
  },
  components: { Container: container, Heading: heading },
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
