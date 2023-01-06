import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/client";

export const login = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider).then((res) => {
    console.log(res);
  });
};

export const logout = () => {
  return signOut(auth).then(() => {
    alert("サインアウト完了");
  });
};
