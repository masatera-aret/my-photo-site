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
      transition={{ duration: 0.3 }}
      className={`fixed t-main-modal left-0 w-full bg-white z-20`}
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
        className={`t-def-header fixed bg-white ${
          is_modal_active ? `bg-opacity-100` : `bg-opacity-90`
        } flex justify-center top-0 left-0 w-full z-50 duration-300`}
      >
        <DefHeader />
      </header>
      <main className={`t-def-main`}>
        {children}
        <AnimatePresence>{is_modal_active && <MainModal />}</AnimatePresence>
      </main>
      <footer className={`t-def-footer flex justify-center items-center`}>
        <div className={`test`}>©Terashima</div>
      </footer>
    </>
  );
};

export default Layout;
