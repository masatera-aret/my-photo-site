import React, { FC, memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import * as Types from "../assets/ts/types/types";
import * as Photos from "../assets/ts/images";

const PhotoImages = Photos.category;

type ExpansionPhotoList = Types.PhotoList & {
  index: number;
};

const Category: FC = () => {
  const el = useRef(null);

  const [hasBreak, setHasBreak] = useState(false);

  useEffect(() => {
    if (hasBreak) {
      window.removeEventListener("scroll", checkWhetherReachBreakpoint);
      window.removeEventListener("resize", checkWhetherReachBreakpoint);
      return;
    }
    function checkWhetherReachBreakpoint(): void {
      const scrollPositionY = window.scrollY;
      const windowBottomY = scrollPositionY + window.innerHeight;
      if (el.current === null) return;
      const breakpoint =
        el.current.getBoundingClientRect().top + scrollPositionY;
      if (breakpoint < windowBottomY) {
        setHasBreak(true);
      }
    }

    checkWhetherReachBreakpoint();

    window.addEventListener("scroll", checkWhetherReachBreakpoint);
    window.addEventListener("resize", checkWhetherReachBreakpoint);

    return () => {
      window.removeEventListener("scroll", checkWhetherReachBreakpoint);
      window.removeEventListener("resize", checkWhetherReachBreakpoint);
    };
  }, [hasBreak]);

  const CategotyImage = ({
    id,
    src,
    alt,
    label,
    index,
  }: ExpansionPhotoList): JSX.Element => {
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
              transition={{ duration: 1, delay: index / 3 }}
              className={`text-gray-500`}
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

  return (
    <>
      <div className={`flex justify-center items-center`}>
        <h1 className={`c-category-title text-green-600 my-4 mx-auto text-2xl`}>
          Category
        </h1>
      </div>
      <ul ref={el} className={`pt-5 mx-auto`}>
        {PhotoImages.map((photo, index) => (
          <CategotyImage
            index={index}
            key={photo.id}
            id={photo.id}
            src={photo.src}
            alt={photo.alt}
            label={photo.label}
          />
        ))}
      </ul>
      <style jsx>
        {`
          .c-category-title {
            position: relative;
            display: inline-block;
          }
          .c-category-title::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 0;
            background-color: #c4c4c4;
            width: 100%;
            height: 1px;
          }
        `}
      </style>
    </>
  );
};

export default memo(Category);
