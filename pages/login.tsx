import React from "react";
import Button from "../components/button";
import { login, logout } from "../lib/auth";

const Login = () => {
  return (
    <>
        <Button onClick={login}>ログインする</Button>
        <Button onClick={logout}>ログアウトする</Button>
    </>
  );
};

export default Login;
