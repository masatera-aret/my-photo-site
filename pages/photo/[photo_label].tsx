import React, { FC, memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Types from "../../assets/ts/types/types";
import { AnimatePresence, motion } from "framer-motion";
import * as Photos from "../../assets/ts/images";

const all_photos = Photos.all_photos;

const PhotoLabel: FC = () => {
  const route = useRouter();
  const { photo_label, photo_id, photo_number } = route.query;
  const [filtered_photo, setFilteredPhotos] = useState<Types.PhotoList[]>();
  const [photo, setPhoto] = useState<Types.PhotoList>();

  function fetchPhotoById(id: number): Types.PhotoList {
    return filtered_photo.find((photo) => photo.id === id);
  }

  function fetchIndexByPhotoId(id: number) {
    return filtered_photo.findIndex((photo) => photo.id === id);
  }

  function isValidPhotoIndex(index: number): boolean {
    if (Number.isNaN(index)) return false;
    const lng = filtered_photo.length;
    return 0 <= index && index < lng;
  }

  function isValidPhotoId(id: number): boolean {
    if (Number.isNaN(id)) return false;
    return filtered_photo.some((photo) => photo.id === id);
  }

  function validatePhotoId(id: number): void {
    console.log("validatePhotoId");
    if (!isValidPhotoId(id)) route.push(`/photo/${photo_label}?photo_number=0`);
    setPhoto(fetchPhotoById(id));
  }

  function validatePhotoIndex(index: number): void {
    console.log("validatePhotoIndex");
    if (!isValidPhotoIndex(index)) {
      route.push(`/photo/${photo_label}?photo_number=0`);
    }
    setPhoto(filtered_photo[index]);
  }

  function prevPhoto() {
    const index = fetchIndexByPhotoId(photo.id);
    const last_photo = filtered_photo.length - 1;
    const prev_photo = index - 1;
    if (index === 0) {
      return route.push(`/photo/${photo_label}?photo_number=${last_photo}`);
    }
    route.push(`/photo/${photo_label}?photo_number=${prev_photo}`);
  }

  function nextPhoto() {
    const index = fetchIndexByPhotoId(photo.id);
    const last_photo = filtered_photo.length - 1;
    if (index === last_photo)
      route.push(`/photo/${photo_label}?photo_number=0`);
    route.push(`/photo/${photo_label}?photo_number=${index + 1}`);
  }

  useEffect(() => {
    const photos = all_photos.filter((photo) => {
      return photo.label.toLocaleLowerCase() === photo_label;
    });
    setFilteredPhotos(photos);
  }, []);

  useEffect(() => {
    if (filtered_photo === undefined) return;
    if (!filtered_photo.length) route.replace(`/`);
    if (photo_id) return validatePhotoId(Number(photo_id));
    if (photo_number) return validatePhotoIndex(Number(photo_number));
    if (!photo_id && !photo_number) return setPhoto(filtered_photo[0]);
  }, [filtered_photo]);

  return (
    <>
      <h1>{photo_number}</h1>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`relative`}
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
            src={photo.src}
            width={photo.src.width}
            height={photo.src.height}
          />
        </motion.div>
      )}
    </>
  );
};

export default memo(PhotoLabel);
