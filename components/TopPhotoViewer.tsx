import React, { FC, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Types from "../assets/ts/types/types";
import * as Photos from "../assets/ts/images";

const PhotoImages = Photos.top_view_photos;
const photos_length = PhotoImages.length;

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const PhotosList: FC = memo(() => {
  console.log("レンダリング");
  const [current_photo_index, setCurrentPhotoIndex] = useState<number>();

  const getInitialPhotoIndex = (photos_length: number): void => {
    const min = 0;
    const max = photos_length - 1;
    const photo_index = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoIndex(photo_index);
  };

  const execPhotoSlide = (): void => {
    if (photos_length - 1 <= current_photo_index)
      return setCurrentPhotoIndex(0);
    setCurrentPhotoIndex((state) => state + 1);
  };

  useEffect(() => {
    getInitialPhotoIndex(photos_length);
  }, []);

  useEffect(() => {
    let unmount = false;
    const timer = setTimeout(() => {
      if (unmount) return;
      execPhotoSlide();
    }, 5000);
    return () => {
      unmount = true;
      clearTimeout(timer);
    };
  }, [current_photo_index]);

  const PhotoElement: FC<Types.PhotoList> = ({ id, src, alt }) => (
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
            (photo, index) =>
              current_photo_index === index && (
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
        {PhotoImages.map((photo, index) => (
          <li
            key={photo.id}
            className={`rounded-[50%] border border-gray-400 w-2 h-2 mr-2 cursor-pointer duration-1000 ${
              current_photo_index === index && `bg-gray-400`
            }`}
            onClick={() => setCurrentPhotoIndex(index)}
          ></li>
        ))}
      </ul>
    </>
  );
});

export default PhotosList;
