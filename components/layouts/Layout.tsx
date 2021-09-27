import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "@/store/index"; //useSelectorのstateの型
import { motion, AnimatePresence } from "framer-motion";
import MobileHeader from "@/components/header/MobileHeader";
import PcHeader from "@/components/header/PcHeader";
import MainModal from "@/components/MainModal";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const breakpoint = 768;

const Layout: React.FC<ChildElement> = ({ children }) => {
  const dispatch = useDispatch();
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);
  const [isMobile, setIsMobile] = useState<boolean>();

  let viewPortwWidth: number;
  useEffect(() => {
    function setViewPortWidth() {
      viewPortwWidth = document.documentElement.clientWidth;
      setIsMobile(viewPortwWidth < breakpoint);
      setIsMobile((state) => {
        if (!state) dispatch({ type: `inactive` });
        return state;
      });
    }
    setViewPortWidth();
    window.addEventListener("resize", setViewPortWidth);
    return () => {
      window.removeEventListener("resize", setViewPortWidth);
    };
  }, [isMobile]);

  return (
    <>
      <Head>
        <title>デフォルトレイアウト</title>
      </Head>
      <header
        className={`t-def-header bg-white fixed flex justify-center top-0 left-0 w-full z-50 duration-300 ${
          isModalActive ? `bg-opacity-100` : `bg-opacity-90`
        }`}
      >
        {isMobile !== undefined && isMobile && <MobileHeader />}
        {isMobile !== undefined && !isMobile && <PcHeader />}
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
