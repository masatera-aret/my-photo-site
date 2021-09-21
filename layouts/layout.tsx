import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { StoreState } from "../store/index"; //useSelectorのstateの型
import { motion, AnimatePresence } from "framer-motion";
import DefHeader from "../components/header/DefHeader";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const MainModal = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed t-main-modal overflow-hidden left-0 w-full bg-gray-300 bg-opacity-90 z-20`}
    >
      <p>test</p>
    </motion.div>
  );
};

const Layout: React.FC<ChildElement> = ({ children }) => {
  const is_modal_active = useSelector(
    (state: StoreState) => state.is_modal_active
  );
  return (
    <>
      <Head>
        <title>デフォルトレイアウト</title>
      </Head>
      <header
        className={`t-def-header fixed ${
          is_modal_active ? `bg-gray-300` : `bg-white`
        } bg-opacity-90 flex justify-center top-0 left-0 w-full z-50 duration-[0.2s]`}
      >
        <DefHeader />
      </header>
      <main className={`t-def-main`}>
        {children}
        <AnimatePresence>{is_modal_active && <MainModal />}</AnimatePresence>
      </main>
      <footer className={`t-def-footer flex justify-center items-center`}>
        <div>©Terashima</div>
      </footer>
    </>
  );
};

export default Layout;
