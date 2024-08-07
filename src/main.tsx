import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Route } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="*"
      element={<App />}
    />
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);
