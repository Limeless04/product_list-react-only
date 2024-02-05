import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./hooks/AuthProvider";
import { BrowserRouter as Router} from "react-router-dom";
import Routes from "./router/routes";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
