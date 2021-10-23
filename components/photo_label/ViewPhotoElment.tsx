import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../Loading";
import { ImageType } from "@/pages/index";

type Params = {
  imageRef: ImageType;
};

const ViewPhotoElment: React.FC<Params> = ({ imageRef }) => {
  const router = useRouter();
  const [isPhotoVertical, setIsPhotoVertical] = useState<boolean>();
  const { photo_label, id } = router.query;

  const [isImageLoading, setImageLoad] = useState(true);

  function photoLoaded() {
    setImageLoad(false);
  }

  function prevPhoto() {
    const prev = Number(id) - 1;
    router.push(`/photo/${photo_label}?id=${prev}`);
  }

  function nextPhoto() {
    const next = Number(id) + 1;
    router.push(`/photo/${photo_label}?id=${next}`);
  }

  useEffect(() => {
    if (!imageRef) return;
    setIsPhotoVertical(imageRef.width < imageRef.height);
  }, [imageRef]);

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
          src={imageRef.url}
          alt={``}
          width={imageRef.width}
          height={imageRef.height}
          onLoad={photoLoaded}
        />
      </motion.div>
      <AnimatePresence>{isImageLoading && <Loading />}</AnimatePresence>
    </>
  );
};

export default ViewPhotoElment;
