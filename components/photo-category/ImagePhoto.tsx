import React, { FC, memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExpansionPhotoList } from "./Location";

const ImagePhoto: React.FC<ExpansionPhotoList> = ({
  id,
  src,
  alt,
  label,
  index,
  hasBreak,
}) => {
  return (
    <>
      {hasBreak ? (
        <li key={id} className={`w-1/2 md:w-1/5 mb-5 inline-block`}>
          <Link href={`/photo/${label.toLowerCase()}`}>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [null, -2, 0],
                transition: { duration: 1, delay: index / 3 },
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className={`block cursor-pointer relative w-[75%] md:w-[90%] pt-[75%] md:pt-[90%] mx-auto`}
            >
              <Image
                className={`pointer-events-none`}
                layout="fill"
                objectFit="cover"
                src={src}
                alt={alt}
              />
            </motion.a>
          </Link>
          <motion.h2
            animate={{ opacity: [0, 1], x: [-5, 0] }}
            transition={{ duration: 0.5, delay: index / 2 }}
            className={`font-extralight`}
          >
            {label}
          </motion.h2>
        </li>
      ) : (
        <li className={`w-1/2 md:w-1/5 mb-5 inline-block`}></li>
      )}
    </>
  );
};

export default ImagePhoto;
