import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "formik";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

let query = new QueryClient();
root.render(
  <QueryClientProvider client={query}>
    {/* <ReactQueryDevtools /> */}
    <App />
  </QueryClientProvider>
);

reportWebVitals();
