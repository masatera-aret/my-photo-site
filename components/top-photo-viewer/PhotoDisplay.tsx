import React, { FC, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import * as Types from "@/assets/ts/types/types";
import * as Photos from "@/assets/ts/images";
import { useRouter } from "next/router";
//context component
import { CurrentPhotoIndexComponent } from "./TopPhotoViewer";

const PhotoImages = Photos.top_view_photos;
const photosLength = PhotoImages.length;

const DisplayingPhoto: FC<Types.PhotoList> = ({ id, src, alt, label }) => {
  const router = useRouter();
  const { currentPhotoIndex, setCurrentPhotoIndex } = useContext(
    CurrentPhotoIndexComponent
  );

  function PhotoSlideToNext(): void {
    // if (!isMounted) return;
    setCurrentPhotoIndex((state) => {
      if (photosLength - 1 <= state) {
        return (state = 0);
      }
      return state + 1;
    });
  }
  function PhotoSlideToPrev(): void {
    setCurrentPhotoIndex((state) => {
      if (state <= 0) {
        return (state = photosLength - 1);
      }
      return (state = state - 1);
    });
  }

  // 写真のスライドをsetIntervalでセット
  let photoSliderInterval: NodeJS.Timer;
  const slideTime = 5000;
  function startPhotoSliderInterval(): void {
    photoSliderInterval = setInterval(PhotoSlideToNext, slideTime);
  }

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

  const positionX = 30;
  function onTap(event: any, info: any) {
    unTapPositionX = info.point.x;
    let movedPosition = unTapPositionX - tapPositionX;

    if (movedPosition < -positionX) {
      PhotoSlideToNext();
      return;
    } else if (positionX < movedPosition) {
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

  return (
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
        style={{ touchAction: "none" }}
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
};

export default DisplayingPhoto;
