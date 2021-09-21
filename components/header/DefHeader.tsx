import React, { FC, useState } from "react";
import Link from "next/link";
import Humburger from "../Humburger";

type Props = {
  css: string;
};

const DefHeader: FC = () => {
  return (
    <div className={`flex relative items-center w-[90%] mx-auto`}>
      <Humburger />
      <div className={`absolute right-0`}>
        <Link href={`/`}>
          <a
            className={`n-title-font text-green-600 text-lg tracking-wider font-extralight`}
          >
            Journeys photo{" "}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default DefHeader;
