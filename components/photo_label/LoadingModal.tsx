import React, { FC, memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Types from "@/assets/ts/types/types";
import { AnimatePresence, motion } from "framer-motion";
import * as Photos from "@/assets/ts/images";

const LoadingModal = (): JSX.Element => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={`fixed top-0 left-0 w-full min-h-screen bg-white flex justify-center items-center z-20`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
        className={`bg-green-400 w-[20%] pt-[20%] sm:pt-0 sm:w-[100px] sm:h-[100px]`}
      ></motion.div>
      <motion.p
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className={`t-loading-text absolute text-green-400 text-xs sm:text-sm tracking-widest font-extralight`}
      >
        Loading
      </motion.p>
    </motion.div>
  </AnimatePresence>
);

export default LoadingModal;
