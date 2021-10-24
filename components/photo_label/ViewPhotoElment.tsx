import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../Loading";
import { ImageType } from "@/pages/index";

type Params = {
  imageRef: ImageType;
  length: number;
};

const ViewPhotoElment: React.FC<Params> = ({ imageRef, length }) => {
  const router = useRouter();
  const [isPhotoVertical, setIsPhotoVertical] = useState<boolean>();
  const { photo_label, num } = router.query;
  const [isImageLoading, setImageLoad] = useState(true);

  function photoLoaded() {
    setImageLoad(false);
  }

  // imageの幅と高さを取得する為にImageを作成
  const img = new Image();
  img.src = imageRef.url;

  // ! imageRefのlengthを取って、それで num= に入れる値を決めよう。
  function prevPhoto() {
    let prev: number;
    if (num) prev = Number(num) - 1;
    if (!num) prev = length;
    if (prev < 1) return router.push(`/photo/${photo_label}?num=${length}`);
    router.push(`/photo/${photo_label}?num=${prev}`);
  }

  function nextPhoto() {
    let next: number;
    if (num) next = Number(num) + 1;
    if (!num) next = 2;
    if (next > length) return router.push(`/photo/${photo_label}?num=1`);
    router.push(`/photo/${photo_label}?num=${next}`);
  }

  useEffect(() => {
    if (!img) return;
    setIsPhotoVertical(img.width < img.height);
  }, [img]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative inline-block leading-3 ${
          isPhotoVertical ? `w-3/4 max-w-[600px]` : `max-w-[950px]`
        }`}
      >
        <span
          className={`absolute top-0 left-0 h-full w-1/2 cursor-pointer z-10`}
          onClick={prevPhoto}
        ></span>
        <span
          className={`absolute top-0 right-0 h-full w-1/2 cursor-pointer z-10`}
          onClick={nextPhoto}
        ></span>
        <NextImage
          src={imageRef.url}
          alt={``}
          priority={true}
          width={img.width}
          height={img.height}
          onLoad={photoLoaded}
        />
      </motion.div>
      <AnimatePresence>{isImageLoading && <Loading />}</AnimatePresence>
    </>
  );
};

export default ViewPhotoElment;
