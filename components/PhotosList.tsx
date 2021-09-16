import React, { FC, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Types from "../assets/ts/types/types";
import PhotoImages from "../assets/ts/images";

const photos_length = PhotoImages.length;

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const PhotosList: FC = memo(() => {
  console.log("レンダリング");
  const [current_photo_id, setCurrentPhotoId] = useState<number>();

  const getInitialPhotoId = (photos_length: number): void => {
    const min = 1;
    const max = photos_length;
    const photo_id = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoId(photo_id);
  };

  const execPhotoSlide = async (): Promise<void> => {
    if (photos_length <= current_photo_id) return setCurrentPhotoId(1);
    setCurrentPhotoId(current_photo_id + 1);
  };

  useEffect(() => {
    getInitialPhotoId(photos_length);
  }, []);

  useEffect(() => {
    if (!current_photo_id) return;
    let unmount = false;
    const timer = setTimeout(() => {
      execPhotoSlide();
    }, 5000);
    return () => {
      unmount = true;
      clearTimeout(timer);
    };
  }, [current_photo_id]);

  const PhotoElement: FC<Types.PhotoList> = ({ id, src, alt, label }) => (
    <>
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`absolute top-0 left-0 w-full h-full`}
      >
        <Link href={`/photos/${id}`}>
          <a className={`block relative pt-[100%]`}>
            <Image
              className={`cursor-pointer`}
              layout="fill"
              objectFit="cover"
              src={src}
              alt={alt}
            />
          </a>
        </Link>
      </motion.li>
    </>
  );

  return (
    <>
      <ul className={`relative pt-[100%]`}>
        <AnimatePresence>
          {PhotoImages.map(
            (photo) =>
              current_photo_id === photo.id && (
                <PhotoElement
                  key={photo.id}
                  id={photo.id}
                  src={photo.src}
                  alt={photo.alt}
                  label={photo.label}
                />
              )
          )}
        </AnimatePresence>
      </ul>
      <ul className={`flex list-none mt-1 p-1`}>
        {PhotoImages.map((photo) => (
          <motion.li
            key={photo.id}
            className={`rounded-[50%] border border-green-300 w-2 h-2 mr-2 cursor-pointer duration-[2s] ${
              current_photo_id === photo.id && `bg-green-400`
            }`}
            onClick={() => setCurrentPhotoId(photo.id)}
          ></motion.li>
        ))}
      </ul>
    </>
  );
});

export default PhotosList;
