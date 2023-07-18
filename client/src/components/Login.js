import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/user";

function Login() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(
            login({ username: "test", email: "test", password: "test" })
          );
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
