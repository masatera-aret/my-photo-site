import React, { FC, memo, createContext } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import * as Photos from "@/assets/ts/images";
import PhotoDisplay from "@/components/top-photo-viewer/PhotoDisplay";
import PhotoPagination from "./PhotoPagination";
import { ImageType } from "@/pages/index";

const PhotoImages = Photos.top_view_photos;
const photosLength = PhotoImages.length;
export const CurrentPhotoIndexContext = createContext(null);

type Params = {
  topImagesByRandom: ImageType[];
};

const TopPhotoViewer: React.FC<Params> = ({ topImagesByRandom }) => {
  // ! topImagesByRandomを展開して写真を表示する様にしろ
  const topImagesLength = topImagesByRandom.length;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>();
  const contextValue = {
    currentPhotoIndex,
    setCurrentPhotoIndex,
  };

  function getInitialPhotoIndex(): void {
    const min = 0;
    const max = photosLength - 1;
    const photo_index = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoIndex(photo_index);
  }

  useEffect(() => {
    getInitialPhotoIndex();
  }, []);

  return (
    <CurrentPhotoIndexContext.Provider value={contextValue}>
      <div className={`md:w-[60%]`}>
        <div className={`relative pt-[100%]`}>
          <AnimatePresence>
            {PhotoImages.map(
              (photo, index) =>
                currentPhotoIndex === index && (
                  <PhotoDisplay
                    key={photo.id}
                    id={photo.id}
                    src={photo.src}
                    alt={photo.alt}
                    label={photo.label}
                  />
                )
            )}
          </AnimatePresence>
        </div>
        <PhotoPagination />
      </div>
    </CurrentPhotoIndexContext.Provider>
  );
};

export default memo(TopPhotoViewer);
