import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Authenticate from "../api/authentication";
import Authcontext from "../components/context/context.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

const Register = () => {
  const clientEmail = useRef();
  const clientPassword = useRef();
  const clientName = useRef();
  const authcontext = React.useContext(Authcontext);

  const authenticate = async (event) => {
    event.preventDefault();
    await Authenticate({
      name: clientName.current.value,
      email: clientEmail.current.value,
      password: clientPassword.current.value,
      mode: "signUp",
    })
      .then((authenticationResult) => {
        console.log("retuned values", authenticationResult);
        authcontext.login(
          authenticationResult.clientToken,
          authenticationResult.clientId
        );
      })
      .catch((error) => {
        toast.error(`${error}`);

        console.log("error", error);
      });
  };

  return (
    <div className="parent_container">
      <div>
        <ToastContainer />
      </div>
      <Grid container spacing={0} className="grid_container">
        <Grid item xs={4}>
          <div className="median_conatainer">
            <img
              className="median_block_image"
              src="https://img.freepik.com/premium-vector/black-white-retro-fashion-model-sketch-style-hand-drawn-vector-illustration_231873-9484.jpg"
              alt="hello"
            />
            <div className="description_median_text"></div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="form_container">
            <form onSubmit={authenticate} className="register_form">
              <h1>Register</h1>

              <input
                className="register_input"
                ref={clientEmail}
                required={true}
                placeholder="Email address"
                type="email"
              />
              <input
                className="register_input"
                ref={clientName}
                required={true}
                placeholder="Name"
                type="text"
              />
              <input
                className="register_input"
                ref={clientPassword}
                required={true}
                placeholder="Password"
                type="password"
              />

              <Button
                className="login_button"
                variant="outlined"
                color="secondary"
                type="submit"
                size="small"
              >
                Register
              </Button>
            </form>
            <NavLink to={`/login`} className="register_account_button">
              <p>Already have an account? Login</p>
            </NavLink>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="median_conatainer">
            <img
              className="median_block_image"
              src="https://img.freepik.com/premium-vector/black-white-retro-fashion-model-sketch-style-hand-drawn-vector-illustration_231873-9522.jpg"
              alt="hello"
            />
            <div className="description_median_text"></div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
