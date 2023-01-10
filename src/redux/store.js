import { debounce } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./client";

const persistedState = JSON.parse(localStorage.getItem("client"));
const store = configureStore({
  reducer: {
    client: clientReducer,
    preloadedState: persistedState,
  },
});

store.subscribe(
  debounce(() => {
    console.log(`${store.getState().client.value}`);
    localStorage.setItem(
      "client",
      JSON.stringify(store.getState().client.value)
    );
  }, 100)
);

export default store;
