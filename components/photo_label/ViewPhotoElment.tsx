import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Types from "@/assets/ts/types/types";
import { motion } from "framer-motion";
import LoadingModal from "./LoadingModal";

type Params = {
  src: StaticImageData;
  alt: string;
  filtered_photo: Types.PhotoList[];
  current_photo: Types.PhotoList;
  photo_label: string | string[];
};

const ViewPhotoElment: React.FC<Params> = ({
  src,
  alt,
  filtered_photo,
  current_photo,
  photo_label,
}) => {
  const route = useRouter();
  const width = src.width;
  const height = src.height;
  const isHorizon = height < width;
  const isvertical = width < height;

  function fetchIndexByPhotoId(id: number) {
    return filtered_photo.findIndex((photo) => photo.id === id);
  }

  function prevPhoto() {
    let index = fetchIndexByPhotoId(current_photo.id);
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
    let index = fetchIndexByPhotoId(current_photo.id);
    index += 1;
    const last_photo = filtered_photo.length;
    const next_photo = index + 1;

    if (index === last_photo) {
      route.push(`/photo/${photo_label}?num=1`);
      return;
    }
    route.push(`/photo/${photo_label}?num=${next_photo}`);
  }

  // let isImaconsole.log();geLoad = true;
  const [isImageLoad, setImageLoad] = useState(true);
  function test() {
    console.log(isImageLoad);
    setImageLoad(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative inline-block leading-3 ${
        isvertical && `w-3/4 max-w-[500px]`
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
        placeholder="blur"
        onLoad={test}
      />
      {isImageLoad && <LoadingModal />}
    </motion.div>
  );
};

export default ViewPhotoElment;
