import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"

import { Amplify } from 'aws-amplify';
import config from "@/aws-exports";

Amplify.configure(config);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
