import React, { FC, memo, useState, useEffect, useRef } from "react";
import {
  motion,
  useViewportScroll,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import * as Types from "../assets/ts/types/types";
import * as Photos from "../assets/ts/images";

const PhotoImages = Photos.category;

type ExpansionPhotoList = Types.PhotoList & {
  index: number;
};

const Category = () => {
  const el = useRef(null);

  const [has_break, setHasBreak] = useState(false);
  let break_poing: number;
  let window_bottom_y: number;
  let el_top_y: number;

  useEffect(() => {
    if (el.current === null) return;

    const el_top_Y = el.current.getBoundingClientRect().top;
    break_poing = el_top_Y;
  }, [el]);

  useEffect(() => {
    if (has_break) {
      window.removeEventListener("scroll", getWindowBottomY);
      window.removeEventListener("resize", getWindowBottomY);
      return;
    }
    function getWindowBottomY() {
      if (has_break) return;
      const scroll_y = window.scrollY;
      const window_height = window.innerHeight;
      el_top_y = el.current.getBoundingClientRect().top + scroll_y;
      window_bottom_y = scroll_y + window_height;
      if (el_top_y < window_bottom_y) {
        setHasBreak(true);
      }
    }

    window.addEventListener("scroll", getWindowBottomY);
    window.addEventListener("resize", getWindowBottomY);

    return () => {
      window.removeEventListener("scroll", getWindowBottomY);
      window.removeEventListener("resize", getWindowBottomY);
    };
  }, [has_break]);

  const CategotyImage = ({
    id,
    src,
    alt,
    label,
    index,
  }: ExpansionPhotoList): JSX.Element => {
    return (
      <>
        {has_break ? (
          <li key={id} className={`w-1/2 mb-5 inline-block`}>
            <Link href={`/photo/${label.toLowerCase()}`}>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [null, -2, 0] }}
                transition={{ duration: 1, delay: index / 3 }}
                className={`block cursor-pointer relative w-[75%] pt-[75%] mx-auto`}
              >
                <div>
                  <Image
                    className={`pointer-events-none`}
                    layout="fill"
                    objectFit="cover"
                    src={src}
                    alt={alt}
                  />
                </div>
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
          <li className={`w-1/2 pt-[75%] mb-5 inline-block`}></li>
        )}
      </>
    );
  };

  return (
    <>
      <ul ref={el} className={`pt-5`}>
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
    </>
  );
};

export default memo(Category);
