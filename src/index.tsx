import Providers from "Providers";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById("root")
);
