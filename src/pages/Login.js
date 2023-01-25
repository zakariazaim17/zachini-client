import React, { useRef } from "react";
import Authenticate from "../api/authentication.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authcontext from "../components/context/context.js";
import "./css/login.css";
import { IoMdArrowDropright } from "react-icons/io";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
toast.configure();

const Login = () => {
  const clientEmail = useRef();
  const clientPassword = useRef();
  const authcontext = React.useContext(Authcontext);

  const authenticate = async (event) => {
    event.preventDefault();
    await Authenticate({
      email: clientEmail.current.value,
      password: clientPassword.current.value,
      mode: "login",
    })
      .then((value) => {
        console.log("vaal", value);
        authcontext.login(value.clientToken, value.clientId);
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
            <form onSubmit={authenticate}>
              <h1>Login</h1>
              <div className="input_container">
                <input
                  ref={clientEmail}
                  required={true}
                  placeholder="Email address"
                  type="email"
                />
                <input
                  ref={clientPassword}
                  required={true}
                  placeholder="Password"
                  type="password"
                />
                <button type="submit">Login</button>
              </div>
            </form>
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

export default Login;
