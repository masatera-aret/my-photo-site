import React, { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Types from "../../assets/ts/types/types";
import { AnimatePresence, motion } from "framer-motion";
import PhotoImages from "../../assets/ts/images";

const Id = () => {
  const route = useRouter();
  const index = Number(route.query.photo_label) - 1;
  return (
    <>
      <p>{route.query.photo_label}</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src={PhotoImages[index].src} />
      </motion.div>
    </>
  );
};

export default Id;
