import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as Types from "@/assets/ts/types/types";
import { useRouter } from "next/router";
import { useHeadersContext, InitialState } from "./HeadersContext";

type Params = {
  params: {
    locations: string[];
  };
};

const MainModal = ({ params }: Params) => {
  const router = useRouter();
  const { state, dispatch } = useHeadersContext();

  let photo_label: string;
  if (typeof router.query.photo_label === "string") {
    photo_label = router.query.photo_label;
  }
  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    el: string
  ) {
    e.preventDefault();
    dispatch({ type: state.isModalActive ? `inactive` : `active` });
    router.push(`/photo/${el}`);
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className={`t-modal-height bg-white w-full flex justify-center items-center z-50`}
    >
      <div className={`border border-gray-400 px-5 py-7 min-w-[200px]`}>
        <ul>
          {params &&
            params.locations.map((el) => (
              <li
                key={el}
                className={`text-center pb-2 last-of-type:pb-0 ${
                  photo_label === el ? `text-green-600` : `text-gray-500`
                }`}
              >
                <Link href={`/photo/${el}`}>
                  <a onClick={(e) => handleClick(e, el)}>
                    {`${el.charAt(0).toUpperCase()}${el.slice(1)}`}
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default MainModal;
