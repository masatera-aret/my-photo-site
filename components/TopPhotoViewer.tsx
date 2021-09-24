import React, { FC, memo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Types from "../assets/ts/types/types";
import * as Photos from "../assets/ts/images";
import { useRouter } from "next/router";

const PhotoImages = Photos.top_view_photos;
const photosLength = PhotoImages.length;

const TopPhotoViewer: FC = () => {
  const router = useRouter();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>();

  function getInitialPhotoIndex(): void {
    const min = 0;
    const max = photosLength - 1;
    const photo_index = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoIndex(photo_index);
  }

  function PhotoSlideToNext(): void {
    if (!isMounted) return;
    setCurrentPhotoIndex((index) => {
      if (photosLength - 1 <= index) {
        return (index = 0);
      }
      return index + 1;
    });
  }
  function PhotoSlideToPrev(): void {
    setCurrentPhotoIndex((index) => {
      if (index <= 0) {
        return (index = photosLength - 1);
      }
      return (index = index - 1);
    });
  }

  // 最初に表示させる写真を決める関数を実行させる
  useEffect(() => {
    getInitialPhotoIndex();
  }, []);

  // 写真のスライドをsetIntervalでセット
  let photoSliderInterval: NodeJS.Timer;
  const slideTime = 5000;
  function startPhotoSliderInterval(): void {
    photoSliderInterval = setInterval(PhotoSlideToNext, slideTime);
  }

  /**
   *
   */
  let isMounted: boolean;
  useEffect(() => {
    isMounted = true;
    startPhotoSliderInterval();
    return () => {
      isMounted = false;
      clearTimeout(photoSliderInterval);
    };
  }, [currentPhotoIndex]);

  let tapPositionX: number;
  let unTapPositionX: number;

  function onTapStart(event: any, info: any) {
    clearTimeout(photoSliderInterval);
    tapPositionX = info.point.x;
  }

  function onTap(event: any, info: any) {
    unTapPositionX = info.point.x;
    let movedPosition = unTapPositionX - tapPositionX;
    if (movedPosition < -50) {
      PhotoSlideToNext();
      return;
    } else if (50 < movedPosition) {
      PhotoSlideToPrev();
      return;
    }
    startPhotoSliderInterval();
  }

  function onTapCancel() {
    startPhotoSliderInterval();
  }

  function click(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    label: string,
    id: number
  ) {
    e.preventDefault();
    router.push(`/photo/${label.toLowerCase()}?id=${id}`);
  }

  const PhotoElement: FC<Types.PhotoList> = ({ id, src, alt, label }) => (
    <>
      <motion.div
        onTapStart={onTapStart}
        onTap={onTap}
        onTapCancel={onTapCancel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`absolute top-0 left-0 w-full`}
      >
        <Link href={`/photo/${label.toLowerCase()}?id=${id}`}>
          <a
            className={`block relative pt-[100%]`}
            onClick={(e) => click(e, label, id)}
          >
            <Image
              className={`cursor-pointer pointer-events-none`}
              layout="fill"
              objectFit="cover"
              src={src}
              alt={alt}
            />
          </a>
        </Link>
      </motion.div>
    </>
  );

  return (
    <div className={`md:w-[55%]`}>
      <div className={`relative pt-[100%]`}>
        <AnimatePresence>
          {PhotoImages.map(
            (photo, index) =>
              currentPhotoIndex === index && (
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
      </div>
      <ul className={`flex list-none mt-1 p-1`}>
        {PhotoImages.map((photo, index) => (
          <li
            key={photo.id}
            className={`rounded-[50%] border border-gray-400 w-2 h-2 mr-2 cursor-pointer duration-1000 ${
              currentPhotoIndex === index && `bg-gray-400`
            }`}
            onClick={() => setCurrentPhotoIndex(index)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default memo(TopPhotoViewer);
