import React, { FC, memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Types from "../../assets/ts/types/types";
import { AnimatePresence, motion } from "framer-motion";
import * as Photos from "../../assets/ts/images";

const all_photos = Photos.all_photos;

const PhotoLabel: FC = () => {
  const route = useRouter();
  const { photo_label, photo_id } = route.query;
  const [filtered_photo, setFilteredPhotos] = useState<Types.PhotoList[]>();
  const [photo, setPhoto] = useState<Types.PhotoList>();

  function getPhoto(id: number): void {
    const photo = filtered_photo.find((photo) => photo.id === id);
    setPhoto(photo);
  }

  function getFilteredPhotoFirstId(): number {
    return filtered_photo[0].id;
  }

  useEffect(() => {
    const filtered_photo = all_photos.filter((photo) => {
      return photo.label.toLocaleLowerCase() === photo_label;
    });
    setFilteredPhotos(filtered_photo);
  }, []);

  useEffect(() => {
    if (filtered_photo === undefined) return;
    if (!filtered_photo.length) {
      route.replace(`/`);
      return;
    }
    if (!photo_id) return getPhoto(getFilteredPhotoFirstId());
    getPhoto(Number(photo_id));
  }, [filtered_photo]);

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
};

export default PhotoLabel;
