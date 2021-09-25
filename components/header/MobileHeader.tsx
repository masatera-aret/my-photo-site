import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Humburger from "../Humburger";

type Props = {
  css: string;
};

const DefHeader: FC = () => {
  const deipatch = useDispatch();
  const router = useRouter();
  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    deipatch({ type: `inactive` });
    router.push(`/`);
    return;
  }
  return (
    <div
      className={`flex relative items-center w-[90%] max-w-[1024px] mx-auto`}
    >
      <Humburger />
      <div className={`absolute right-0`}>
        <a
          href={`/`}
          className={`n-title-font text-green-600 text-xl tracking-wider font-extralight`}
          onClick={(e) => handleClick(e)}
        >
          Journeys photo{" "}
        </a>
      </div>
    </div>
  );
};

export default DefHeader;
