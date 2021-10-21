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
  const topImagesLength = topImagesByRandom.length;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>();
  const contextValue = {
    currentPhotoIndex,
    setCurrentPhotoIndex,
  };

  function getInitialPhotoIndex(): void {
    const min = 0;
    const max = topImagesLength - 1;
    const randamIndex = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoIndex(randamIndex);
  }

  useEffect(() => {
    getInitialPhotoIndex();
  }, []);

  return (
    <CurrentPhotoIndexContext.Provider value={contextValue}>
      <div className={`md:w-[60%]`}>
        <div className={`relative pt-[100%]`}>
          <AnimatePresence>
            {topImagesByRandom.map(
              (photo, index) =>
                currentPhotoIndex === index && (
                  <PhotoDisplay
                    key={photo.id}
                    id={photo.id}
                    url={photo.url}
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
