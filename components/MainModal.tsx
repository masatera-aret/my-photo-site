import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { category } from "@/assets/ts/images";
import * as Types from "@/assets/ts/types/types";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "@/store/index";

const MainModal: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);

  let photo_label: string;
  if (typeof router.query.photo_label === "string") {
    photo_label = router.query.photo_label;
  }
  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    el: Types.PhotoList
  ) {
    e.preventDefault();
    dispatch({ type: isModalActive ? `inactive` : `active` });
    router.push(`/photo/${el.label.toLocaleLowerCase()}`);
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`t-main-modal w-full bg-white flex justify-center items-center z-20`}
    >
      <div className={`border border-gray-400 px-5 py-7 min-w-[200px]`}>
        <ul>
          {category.map((el) => (
            <li
              key={el.id}
              className={`text-center pb-2 last-of-type:pb-0 ${
                photo_label === el.label.toLowerCase()
                  ? `text-green-600`
                  : `text-gray-500`
              }`}
            >
              <Link href={`/photo/${el.label.toLowerCase()}`}>
                <a onClick={(e) => handleClick(e, el)}>{el.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default MainModal;
