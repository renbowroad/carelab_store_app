import classNames from "classnames";
import { firestore } from "firebase-admin";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { auth, db } from "../firebase/client";

type User = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const submit = (data: User) => {
    SingUp(data.name, data.email, data.password);
  };

  const SingUp = (name: string, email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      console.log(user);
      if (user) {
        const usersRef = collection(db, "users");
        const documentRef = addDoc(usersRef, {
          name: name,
          email: email,
          password: password,
        })
          .then(() => {
            console.log(documentRef);
          })
          .catch(() => alert("エラーが発生しました"));
      }
      router.push("/");
    });
  };

  return (
    <div className="container">
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <label className="block mb-0.5" htmlFor="name">
            名前*
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-300"
            )}
            autoComplete="name"
            {...register("name", {
              required: "必須項目です",
              maxLength: {
                value: 50,
                message: "最大50文字です",
              },
            })}
            type="text"
            id="name"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-0.5" htmlFor="email">
            メールアドレス*
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.email ? "border-red-500" : "border-slate-300"
            )}
            autoComplete="email"
            {...register("email", {
              required: "必須項目です",
              maxLength: {
                value: 50,
                message: "最大50文字です",
              },
            })}
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-0.5" htmlFor="password">
            パスワード* 6文字以上20文字以下
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.password ? "border-red-500" : "border-slate-300"
            )}
            {...register("password", {
              required: "必須項目です",
              maxLength: {
                value: 20,
                message: "最大20文字です",
              },
            })}
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className="text-sm text-slate-400">
            {watch("password")?.length || 0}/20
          </p>
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </div>

        <Button>アカウント作成</Button>
      </form>
    </div>
  );
};

export default Signup;
