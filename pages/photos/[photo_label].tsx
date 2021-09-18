import React, { FC, memo, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Types from "../../assets/ts/types/types";
import { AnimatePresence, motion } from "framer-motion";
import * as Photos from "../../assets/ts/images";

const PhotoImages = Photos.all_photos;

const Id: FC = memo(() => {
  console.log("Idレンダリング");
  const route = useRouter();
  const photo_id = route.query.photo_label;
  const [photo, setPhoto] = useState<Types.PhotoList>();

  const getPhoto = () => {
    const photo = PhotoImages.find((photo) => photo.id === Number(photo_id));
    setPhoto(photo);
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={photo.src}
            width={photo.src.width}
            height={photo.src.height}
          />
        </motion.div>
      )}
    </>
  );
});

export default Id;
