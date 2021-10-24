import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import { ImageType } from "@/pages/index";

type Props = {
  location: ImageType;
  index: number;
  hasBreak: boolean;
};

const ImagePhoto = ({ location, index, hasBreak }: Props) => {
  const label = location.id.split(`_`)[0];
  return (
    <>
      {hasBreak ? (
        <li key={location.id} className={`w-1/2 md:w-1/5 mb-5 inline-block`}>
          <Link href={`/photo/${label}`}>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [null, -2, 0],
                transition: { duration: 1, delay: index / 3 },
              }}
              whileHover={{
                scale: [null, 1.04, 1.03],
                transition: { duration: 0.5 },
              }}
              className={`block cursor-pointer relative w-[90%] pt-[45%] mx-auto`}
            >
              <NextImage
                className={`pointer-events-none`}
                layout="fill"
                objectFit="cover"
                src={location.url}
                alt={``}
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
