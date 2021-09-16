import React from "react";
import Head from "next/head";
import DefHeader from "../components/header/DefHeader";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<ChildElement> = ({ children }) => {
  return (
    <>
      <Head>
        <title>デフォルトレイアウト</title>
      </Head>
      <DefHeader />
      <main className={`t-def-main`}>{children}</main>
      <footer className={`t-def-footer flex justify-center items-center`}>
        <div>©Terashima</div>
      </footer>
    </>
  );
};

export default Layout;
