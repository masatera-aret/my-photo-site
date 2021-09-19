import React, { FC, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Types from "../assets/ts/types/types";
import * as Photos from "../assets/ts/images";

const PhotoImages = Photos.category;

const Horizon = ({ id, src, label }: Partial<Types.PhotoList>): JSX.Element => (
  <>
    <li key={id} className={`w-[50%] mb-5 inline-block`}>
      <Link href={`/photo/${label.toLowerCase()}`}>
        <a className={`block relative w-[75%] pt-[75%] mx-auto opacity-80`}>
          <Image layout="fill" objectFit="cover" src={src} />
        </a>
      </Link>
      <span className={`text-gray-500`}>{label}</span>
    </li>
  </>
);

const Category = () => {
  // console.log("Category");
  return (
    <>
      <ul>
        {PhotoImages.map((photo) => (
          <Horizon
            key={photo.id}
            id={photo.id}
            src={photo.src}
            label={photo.label}
          />
        ))}
      </ul>
    </>
  );
};

export default Category;
