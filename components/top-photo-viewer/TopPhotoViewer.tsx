import React, { FC, memo, createContext } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import * as Photos from "@/assets/ts/images";
import PhotoDisplay from "@/components/top-photo-viewer/PhotoDisplay";
import PhotoPagination from "./PhotoPagination";

const PhotoImages = Photos.top_view_photos;
const photosLength = PhotoImages.length;
export const CurrentPhotoIndexComponent = createContext(null);

const TopPhotoViewer: FC = () => {
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
    <CurrentPhotoIndexComponent.Provider value={contextValue}>
      <div className={`md:w-[55%]`}>
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
    </CurrentPhotoIndexComponent.Provider>
  );
};

export default memo(TopPhotoViewer);
