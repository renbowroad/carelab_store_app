import classNames from "classnames";
import { firestore } from "firebase-admin";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { auth, db } from "../firebase/client";
import axios from "axios";

type User = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const SingUp = (data: User) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(result);
        fetch("http://localhost:8080/v1/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            myschema_users{
              name
            }
          }
        `,
            variables: {},
          }),
        });
      })
      .then((e) => console.log(e));
  };

  return (
    <div className="container">
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit(SingUp)} className="space-y-6">
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
            onChange={(e) => {
              setName(e.target.value);
            }}
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
