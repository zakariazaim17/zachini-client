import React, { useRef } from "react";
import Authenticate from "../api/authentication.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authcontext from "../components/context/context.js";

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
    <>
      <div>
        <ToastContainer />
      </div>
      <div>
        <form onSubmit={authenticate}>
          <h1>Login</h1>
          <div>
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
    </>
  );
};

export default Login;
