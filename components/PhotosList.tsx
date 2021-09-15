import React, { FC, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

//写真
import Egypt1 from "../public/Egypt/_MG_5531.jpg";
import Egypt2 from "../public/_MG_1914.jpg";
import Egypt3 from "../public/Egypt/_MG_5721.jpg";
import Photo1 from "../public/Egypt/_MG_6324.jpg";

type PhotoList = {
  id: number;
  src: StaticImageData;
  alt: string;
};

const photo_list: PhotoList[] = [
  { id: 1, src: Egypt1, alt: "エジプトの写真" },
  { id: 2, src: Egypt2, alt: "モロッコの写真" },
  { id: 3, src: Egypt3, alt: "モロッコの写真" },
  { id: 4, src: Photo1, alt: "テスト" },
];
const photos_length = photo_list.length;

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const PhotosList: FC = memo(() => {
  const [current_photo_id, setCurrentPhotoId] = useState<number>();

  const getInitialPhotoId = (photos_length: number): void => {
    const min = 1;
    const max = photos_length;
    const photo_id = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoId(photo_id);
  };

  const execPhotoSlide = async (): Promise<void> => {
    await wait(5000);
    if (photos_length <= current_photo_id) return setCurrentPhotoId(1);
    setCurrentPhotoId(current_photo_id + 1);
  };

  useEffect(() => {
    getInitialPhotoId(photos_length);
  }, []);

  useEffect(() => {
    if (!current_photo_id) return;
    let unmount = false;
    execPhotoSlide();
    return () => {
      unmount = true;
    };
  }, [current_photo_id]);

  const PhotoElement = ({ id, src, alt }: PhotoList): JSX.Element => (
    <>
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`absolute top-0 left-0 w-full h-full`}
      >
        <Link href={`/testpage/${id}`}>
          <a className={`block relative pt-[100%]`}>
            <Image
              className={`cursor-pointer`}
              layout="fill"
              objectFit="cover"
              src={src}
              alt={alt}
            />
          </a>
        </Link>
      </motion.li>
    </>
  );

  return (
    <div className={`p-7`}>
      <ul className={`relative pt-[100%]`}>
        <AnimatePresence>
          {photo_list.map(
            (photo) =>
              current_photo_id === photo.id && (
                <PhotoElement
                  key={photo.id}
                  id={photo.id}
                  src={photo.src}
                  alt={photo.alt}
                />
              )
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
});

export default PhotosList;
