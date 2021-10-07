import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { location } from "@/assets/ts/images";
import * as Types from "@/assets/ts/types/types";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const MenuOnPC: FC = () => {
  const router = useRouter();
  const label = router.query.photo_label;

  return (
    <>
      <ul className={`flex`}>
        {location.map((el: Types.PhotoList) => (
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
    </>
  );
};

export default MenuOnPC;
