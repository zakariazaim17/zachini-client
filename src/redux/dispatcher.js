import React from "react";
import { increment, decrement } from "./client";
import { useSelector, useDispatch } from "react-redux";

function incrementClient() {
  const dispatch = useDispatch();
  dispatch(increment());
}

function decrementClient() {
  const dispatch = useDispatch();
  dispatch(decrement());
}

export { incrementClient, decrementClient };
