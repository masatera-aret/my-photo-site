import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index";
import MenuByMobile from "./MenuByMobile";
import MenuByPC from "./MenuByPC";
import { AnimatePresence } from "framer-motion";
import MainModal from "@/components/header/MainModal";
import { useHeadersContext, InitialState } from "./HeadersContext";

type State = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
};

const Header: React.FC = () => {
  const router = useRouter();
  const { state, dispatch }: State = useHeadersContext();
  const [isMobile, setIsMobile] = useState<boolean>();
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);
  const breakpoint = useSelector((state: StoreState) => state.breakpoint);

  let viewPortwWidth: number;
  useEffect(() => {
    function setViewPortWidth() {
      viewPortwWidth = window.innerWidth;
      const isWidthMobile = viewPortwWidth < breakpoint;
      setIsMobile(isWidthMobile);
      if (!isWidthMobile) return dispatch({ type: `inactive` });
    }
    setViewPortWidth();
    window.addEventListener("resize", setViewPortWidth);
    return () => {
      window.removeEventListener("resize", setViewPortWidth);
    };
  }, [isMobile]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    dispatch({ type: `inactive` });
    router.push(`/`);
    return;
  }

  return (
    <>
      <div
        className={`flex relative items-center w-[90%] max-w-[1024px] mx-auto`}
      >
        {isMobile ? <MenuByMobile /> : isMobile !== undefined && <MenuByPC />}
        <div className={`absolute right-0`}>
          <a
            href={`/`}
            className={`n-title-font text-green-600 text-xl tracking-wider font-extralight`}
            onClick={(e) => handleClick(e)}
          >
            {siteTitle}
          </a>
        </div>
      </div>
      <AnimatePresence>{state.isModalActive && <MainModal />}</AnimatePresence>
    </>
  );
};

export default Header;
