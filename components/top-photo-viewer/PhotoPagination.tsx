import React, { useContext } from "react";
import { CurrentPhotoIndexComponent } from "./TopPhotoViewer";
import * as Photos from "@/assets/ts/images";

const PhotoImages = Photos.top_view_photos;

const PhotoPagination: React.FC = () => {
  const { currentPhotoIndex, setCurrentPhotoIndex } = useContext(
    CurrentPhotoIndexComponent
  );
  return (
    <>
      <ul className={`flex list-none mt-1 p-1`}>
        {PhotoImages.map((photo, index) => (
          <li
            key={photo.id}
            className={`rounded-[50%] border border-gray-400 w-2 h-2 mr-2 cursor-pointer duration-1000 ${
              currentPhotoIndex === index && `bg-gray-400`
            }`}
            onClick={() => setCurrentPhotoIndex(index)}
          ></li>
        ))}
      </ul>
    </>
  );
};

export default PhotoPagination;
