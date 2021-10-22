import React, { useState } from "react";
import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

type photo = {
  location: string[];
};

type Props = {
  photos: photo;
};

const ob = {
  Egypt: [],
  Flower: [],
};

const TestPhoto = ({ images, locations }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const route = useRouter();
  const { loc } = route.query;
  const photos = images[loc as string];
  const length = photos && photos.length;

  function patination() {
    setCurrentPhotoIndex((v) => {
      if (v >= length - 1) return (v = 0);
      return v + 1;
    });
  }
  return (
    <div>
      <h1>写真を表示させたい</h1>
      <ul>
        <li>
          <Link href={`/test_photo?loc=Morocco`}>
            <a>モロッコ</a>
          </Link>
        </li>
        <li>
          <Link href={`/test_photo?loc=Egypt`}>
            <a>エジプト</a>
          </Link>
        </li>
        <li>
          <Link href={`/test_photo?loc=Turkey`}>
            <a>トルコ</a>
          </Link>
        </li>
        <li>
          <Link href={`/test_photo?loc=Landscape`}>
            <a>Landscape</a>
          </Link>
        </li>
        <li>
          <Link href={`/test_photo?loc=Jordan`}>
            <a>Jordan</a>
          </Link>
        </li>
      </ul>
      <div className={`p-5`}>
        <div className={`relative w-[300px] h-[300px]`}>
          {photos &&
            photos.map(
              (photo: string, index: number) =>
                index === currentPhotoIndex && (
                  <div key={index} className={`w-[300px] h-[300px] absolute`}>
                    <Image
                      src={`/images/${loc}/${photo}`}
                      layout={`fill`}
                      objectFit={`contain`}
                      alt=""
                    />
                  </div>
                )
            )}
        </div>
      </div>
      <button onClick={patination} className={`rounded bg-blue-400 p-2`}>
        次へ
      </button>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const imagesDirectoryPath = path.join(process.cwd(), `public/images`);
  const photoDirectoryNames = fs.readdirSync(imagesDirectoryPath);

  const photos = photoDirectoryNames.map((dirName) => {
    const dirPath = path.join(imagesDirectoryPath, dirName);
    const photoName = fs.readdirSync(dirPath);
    return {
      [dirName]: photoName,
    };
  });

  const images = photos.reduce((obj, data) => {
    return { ...obj, ...data };
  }, {});

  return {
    props: {
      locations: photoDirectoryNames,
      images,
    },
  };
};

export default TestPhoto;
