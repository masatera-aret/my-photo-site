import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as Types from "@/assets/ts/types/types";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Params = {
  params: {
    locations: string[];
  };
};

const MenuOnPC = ({ params }: Params) => {
  const router = useRouter();
  const label = router.query.photo_label;

  return (
    <>
      <ul className={`flex`}>
        {location &&
          params &&
          params.locations.map((el: string) => (
            <li key={el} className={`pr-3 text-gray-900 font-thin`}>
              <Link href={`/photo/${el}`}>
                <motion.a
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className={`inline-block cursor-pointer ${
                    label === el && `text-green-600`
                  }`}
                >
                  {`${el.charAt(0).toUpperCase()}${el.slice(1)}`}
                </motion.a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MenuOnPC;
