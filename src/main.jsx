import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import store from "./store"
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
  // </React.StrictMode>
);
