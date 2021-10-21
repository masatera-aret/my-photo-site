import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import * as Types from "@/assets/ts/types/types";
import * as Photos from "@/assets/ts/images";
import { useRouter } from "next/router";
//context component
import { CurrentPhotoIndexContext } from "./TopPhotoViewer";

const PhotoImages = Photos.top_view_photos;
const photosLength = PhotoImages.length;

const DisplayingPhoto: React.FC<Types.PhotoList> = ({
  id,
  src,
  alt,
  label,
}) => {
  const router = useRouter();
  const { currentPhotoIndex, setCurrentPhotoIndex } = useContext(
    CurrentPhotoIndexContext
  );

  function PhotoSlideToNext(): void {
    // if (!isMounted) return;
    setCurrentPhotoIndex((state: number) => {
      if (photosLength - 1 <= state) {
        return (state = 0);
      }
      return state + 1;
    });
  }
  function PhotoSlideToPrev(): void {
    setCurrentPhotoIndex((state: number) => {
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

  /**
   * 表示する写真がセットされたら発火し、mount状態である以上は
   * startPhotoSliderInterval() で写真を入れ替える関数がintervalでセットされる
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

  /**
   * 画面tapでの挙動
   * 以下3つの関数で写真のスワイプで写真が変わる
   * onTapStart   tapすると発火
   * onTap        tapして画面から指が離れると発火
   * onTapCancel  要素外で指が離れると発火
   */
  let tapPositionX: number;
  let unTapPositionX: number;
  function onTapStart(event: any, info: any) {
    clearTimeout(photoSliderInterval);
    tapPositionX = info.point.x;
  }

  const necessaryMoveX = 30;
  function onTap(event: any, info: any) {
    unTapPositionX = info.point.x;
    const movedPositionX = unTapPositionX - tapPositionX;

    if (movedPositionX < -necessaryMoveX) {
      PhotoSlideToNext();
      return;
    } else if (necessaryMoveX < movedPositionX) {
      PhotoSlideToPrev();
      return;
    }
    startPhotoSliderInterval();
  }

  function onTapCancel() {
    startPhotoSliderInterval();
  }

  function clickImage(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    label: string,
    id: number,
    src: StaticImageData
  ) {
    e.preventDefault();
    const photosHasLabel = Photos.all_photos.filter((i) => i.label === label);
    const index = photosHasLabel.findIndex((i) => i.id === id);
    router.push(`/photo/${label.toLowerCase()}?num=${index + 1}`);
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
            onClick={(e) => clickImage(e, label, id, src)}
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
