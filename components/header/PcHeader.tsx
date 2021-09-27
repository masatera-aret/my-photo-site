import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { category } from "@/assets/ts/images";
import * as Types from "@/assets/ts/types/types";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  css: string;
};

const DefHeader: FC = () => {
  const deipatch = useDispatch();
  const router = useRouter();
  const label = router.query.photo_label;
  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    deipatch({ type: `inactive` });
    router.push(`/`);
    // window.location.href = `/`;
    return;
  }
  return (
    <>
      <div
        className={`flex relative items-center w-[90%] max-w-[1024px] mx-auto`}
      >
        <ul className={`flex`}>
          {category.map((el: Types.PhotoList) => (
            <li key={el.id} className={`pr-3 text-gray-900 font-thin`}>
              <Link href={`/photo/${el.label.toLocaleLowerCase()}`}>
                <motion.a
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className={`inline-block cursor-pointer ${
                    label === el.label.toLocaleLowerCase() && `text-green-600`
                  }`}
                >
                  {el.label}
                </motion.a>
              </Link>
            </li>
          ))}
        </ul>
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
      <style jsx>
        {`
          .c-hover-anime:hover {
            position: relative;
            padding-bottom: 5px;
          }
          .c-hover-anime:hover::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            animation: wide 0.5s;
            background-color: black;
          }

          @keyframes wide {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          } ;
        `}
      </style>
    </>
  );
};

export default DefHeader;
