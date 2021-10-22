import React, { useState, useEffect } from "react";
import Images from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../Loading";
import { ImageType } from "@/pages/index";

type Params = {
  imageRef: ImageType;
};

const ViewPhotoElment: React.FC<Params> = ({ imageRef }) => {
  const [isImageLoading, setImageLoad] = useState(true);

  function photoLoaded() {
    setImageLoad(false);
  }

  function prevPhoto() {
    console.log("prevPhoto");
  }

  function nextPhoto() {
    console.log("nextPhoto");
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative inline-block leading-3`}
      >
        <span
          className={`absolute top-0 left-0 h-full w-1/2 cursor-pointer z-10`}
          onClick={prevPhoto}
        ></span>
        <span
          className={`absolute top-0 right-0 h-full w-1/2 cursor-pointer z-10`}
          onClick={nextPhoto}
        ></span>
        <Images
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
