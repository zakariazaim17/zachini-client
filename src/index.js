import React from "react";
import { createRoot } from "react-dom/client";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
