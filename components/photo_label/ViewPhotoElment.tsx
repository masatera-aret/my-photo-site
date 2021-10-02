import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Types from "@/assets/ts/types/types";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "./Loading";

type Params = {
  src: StaticImageData;
  alt: string;
  id: number;
  filtered_photo: Types.PhotoList[];
  photo_label: string | string[];
};

const ViewPhotoElment: React.FC<Params> = ({
  src,
  alt,
  id,
  filtered_photo,
  photo_label,
}) => {
  const route = useRouter();
  const width = src.width;
  const height = src.height;
  const isPhotoVertical = width < height;

  function fetchIndexByPhotoId(id: number) {
    return filtered_photo.findIndex((photo) => photo.id === id);
  }

  function prevPhoto() {
    let index = fetchIndexByPhotoId(id);
    index += 1;
    const last_photo = filtered_photo.length;
    const prev_photo = index - 1;

    if (index === 1) {
      route.push(`/photo/${photo_label}?num=${last_photo}`);
      return;
    }
    route.push(`/photo/${photo_label}?num=${prev_photo}`);
  }

  // 写真の右半分をクリックした際の関数。写真は filtered_photo のindex「num」で取得している。
  // urlで ?num=0 となるのはきれいではないのでurlでの表示はindexの+1となっている。その為 index += 1 としている。
  function nextPhoto() {
    let index = fetchIndexByPhotoId(id);
    index += 1;
    const last_photo = filtered_photo.length;
    const next_photo = index + 1;

    if (index === last_photo) {
      route.push(`/photo/${photo_label}?num=1`);
      return;
    }
    route.push(`/photo/${photo_label}?num=${next_photo}`);
  }

  const [isImageLoad, setImageLoad] = useState(true);

  function photoLoaded() {
    setImageLoad(false);
  }

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
        <Image
          src={src}
          alt={alt}
          width={src.width}
          height={src.height}
          onLoad={photoLoaded}
        />
        <AnimatePresence>{isImageLoad && <Loading />}</AnimatePresence>
      </motion.div>
    </>
  );
};

export default ViewPhotoElment;
