import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { StoreState } from "../store/index"; //useSelectorのstateの型
import { motion, AnimatePresence } from "framer-motion";
import DefHeader from "../components/header/DefHeader";
import MainModal from "../components/MainModal";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<ChildElement> = ({ children }) => {
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);
  return (
    <>
      <Head>
        <title>デフォルトレイアウト</title>
      </Head>
      <header
        className={`t-def-header fixed bg-white flex justify-center top-0 left-0 w-full z-50 duration-300 ${
          isModalActive ? `bg-opacity-100` : `bg-opacity-90`
        }`}
      >
        <DefHeader />
      </header>
      <main className={`t-def-main`}>
        {children}
        <AnimatePresence>{isModalActive && <MainModal />}</AnimatePresence>
      </main>
      <footer className={`t-def-footer flex justify-center items-center`}>
        <div className={`test`}>©Terashima</div>
      </footer>
    </>
  );
};

export default Layout;
