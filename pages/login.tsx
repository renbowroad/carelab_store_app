import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import Button from "../components/button";
import { auth } from "../firebase/client";

const Login = () => {
  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((res) => {
      console.log(res);
    });
  };
  return <Button onClick={login}>ログインする</Button>;
};

export default Login;
