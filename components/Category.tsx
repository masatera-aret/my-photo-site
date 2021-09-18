import React, { FC, memo } from "react";
import Image from "next/image";
import * as Types from "../assets/ts/types/types";
import * as Photos from "../assets/ts/images";

const PhotoImages = Photos.category;
const photoRaio = (width: number, height: number): string => {
  if (width < height) return "vertical";
  if (height < width) return "horizon";
};

const Horizon = ({ id, src, label }: Partial<Types.PhotoList>): JSX.Element => (
  <li key={id} className={`relative w-full border bg-gray-200 mt-2`}>
    <span className={`absolute bottom-0 right-0`}>{label}</span>
    <div className={`relative w-[60%] pt-[40%] opacity-80`}>
      <Image layout="fill" objectFit="cover" src={src} />
    </div>
  </li>
);

const Vertical = ({
  id,
  src,
  label,
}: Partial<Types.PhotoList>): JSX.Element => (
  <li key={id} className={`relative w-full border bg-gray-200 mt-2`}>
    <span className={`absolute bottom-0 right-0`}>{label}</span>
    <div className={`relative w-[40%] pt-[60%] opacity-80`}>
      <Image layout="fill" objectFit="cover" src={src} />
    </div>
  </li>
);

const Category: FC = memo(() => {
  console.log("Category");
  return (
    <>
      <ul>
        {PhotoImages.map((photo) => (
          <>
            {photoRaio(photo.src.width, photo.src.height) === "horizon" && (
              <Horizon id={photo.id} src={photo.src} label={photo.label} />
            )}
            {photoRaio(photo.src.width, photo.src.height) === "vertical" && (
              <Vertical id={photo.id} src={photo.src} label={photo.label} />
            )}
          </>
        ))}
      </ul>
    </>
  );
});

export default Category;
