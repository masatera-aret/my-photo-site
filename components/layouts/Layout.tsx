import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index"; //useSelectorのstateの型
import { AnimatePresence } from "framer-motion";
import Header from "@/components/header/Header";
import MainModal from "@/components/MainModal";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<ChildElement> = ({ children }) => {
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);

  return (
    <>
      <header
        className={`t-def-header bg-white fixed flex justify-center top-0 left-0 w-full z-50 duration-300 ${
          isModalActive ? `bg-opacity-100` : `bg-opacity-90`
        }`}
      >
        <Header />
      </header>
      <main className={`t-def-main`}>
        {children}
        <AnimatePresence>{isModalActive && <MainModal />}</AnimatePresence>
      </main>
      <footer className={`t-def-footer flex justify-center items-center`}>
        <div className={`test`}>{`©${siteTitle}`}</div>
      </footer>
    </>
  );
};

export default Layout;
