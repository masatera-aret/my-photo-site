import React, { FC, memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Types from "../../assets/ts/types/types";
import { AnimatePresence, motion } from "framer-motion";
import * as Photos from "../../assets/ts/images";

const all_photos = Photos.all_photos;

const PhotoLabel: FC = () => {
  const route = useRouter();
  const { photo_label, id, num } = route.query;
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
    if (!isValidPhotoId(id)) route.push(`/photo/${photo_label}?num=1`);
    setPhoto(fetchPhotoById(id));
  }

  function validatePhotoIndex(index: number): void {
    const inner_index = index - 1;
    if (!isValidPhotoIndex(inner_index)) {
      route.push(`/photo/${photo_label}?num=1`);
      return;
    }
    setPhoto(filtered_photo[inner_index]);
  }

  function prevPhoto() {
    let index = fetchIndexByPhotoId(photo.id);
    index += 1;
    const last_photo = filtered_photo.length;
    const prev_photo = index - 1;
    if (index === 1) {
      route.push(`/photo/${photo_label}?num=${last_photo}`);
      return;
    }
    route.push(`/photo/${photo_label}?num=${prev_photo}`);
  }

  function nextPhoto() {
    let index = fetchIndexByPhotoId(photo.id);
    index += 1;
    const last_photo = filtered_photo.length;
    if (index === last_photo) {
      route.push(`/photo/${photo_label}?num=1`);
      return;
    }
    route.push(`/photo/${photo_label}?num=${index + 1}`);
  }

  useEffect(() => {
    if (!photo_label) return;
    const photos = all_photos.filter((photo) => {
      return photo.label.toLocaleLowerCase() === photo_label;
    });
    setFilteredPhotos(photos);
  }, [photo_label]);

  useEffect(() => {
    if (!filtered_photo) return;
    if (!filtered_photo.length) route.replace(`/`);
    if (id) return validatePhotoId(Number(id));
    if (num) return validatePhotoIndex(Number(num));
    if (!id && !num) return setPhoto(filtered_photo[0]);
  }, [filtered_photo]);

  const LoadingModal = (): JSX.Element => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`fixed top-0 left-0 w-full min-h-screen bg-white flex justify-center items-center z-20`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ rotate: 360, opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
          className={`bg-green-400 w-[20%] pt-[20%] sm:pt-0 sm:w-[100px] sm:h-[100px]`}
        ></motion.div>
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className={`t-loading-text absolute text-green-400 text-xs sm:text-sm tracking-widest font-extralight`}
        >
          Loading
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      {photo ? (
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
            alt={photo.alt}
            width={photo.src.width}
            height={photo.src.height}
          />
        </motion.div>
      ) : (
        <LoadingModal />
      )}
    </>
  );
};

export default memo(PhotoLabel);
