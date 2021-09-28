import React, { useState } from "react";
import Head from "next/head";

export const getServerSideProps = async () => ({
  props: {
    layout: "plain",
  },
});
const login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  function login(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={`t-main-height flex justify-center items-center`}>
        <form
          className={`w-1/3 min-w-[250px] max-w-[350px] flex flex-col items-center mx-auto py-12 px-8 border border-gray-400`}
        >
          <h1 className={`t-under-border text-green-600`}>login</h1>
          <div className={`w-full mt-3`}>
            <label htmlFor={"email"}>email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id={`email`}
              className={`w-full px-2`}
            />
          </div>
          <div className={`w-full mt-3`}>
            <label htmlFor={"password"}>password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id={`password`}
              className={`w-full px-2`}
            />
          </div>
          <button
            onClick={(e) => login(e)}
            className={`w-full bg-green-500 text-white rounded py-1 mt-5`}
          >
            ログイン
          </button>
        </form>
      </div>
    </>
  );
};

export default login;
