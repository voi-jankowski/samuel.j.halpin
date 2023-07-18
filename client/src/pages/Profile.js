import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import ChangeColor from "../components/ChangeColor";

export default function Profile() {
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <Login />
      <ChangeColor />
    </div>
  );
}
