import React, { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index";
import Head from "next/head";
import * as Types from "@/assets/ts/types/types";
import ViewPhotoElment from "@/components/photo_label/ViewPhotoElment";
import axios from "axios";
import { ImageType } from "@/pages/index";

type ParamsType = {
  images: ImageType[];
};

const PhotoLabel: React.FC<ParamsType> = ({ images }) => {
  const route = useRouter();
  const { photo_label, id, num } = route.query;
  const testPhotoRef = images.find((e) => e.id === `${photo_label}_${id}`);

  const locationTitle =
    typeof photo_label === "string" && photo_label.toUpperCase();
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);
  const [filtered_photo, setFilteredPhotos] = useState<Types.PhotoList[]>();
  const [current_photo, setCurrentPhoto] = useState<Types.PhotoList>();

  function fetchPhotoById(id: number): Types.PhotoList {
    if (!filtered_photo) return;
    return filtered_photo.find((photo) => photo.id === id);
  }

  function isValidPhotoIndex(index: number): boolean {
    if (Number.isNaN(index)) return false;
    if (filtered_photo) {
      const lng = filtered_photo.length;
      return 0 <= index && index < lng;
    }
    return false;
  }

  function isValidPhotoId(id: number): boolean {
    if (Number.isNaN(id)) return false;

    return filtered_photo.some((photo) => photo.id === id);
  }

  function validatePhotoId(id: number): void {
    if (!isValidPhotoId(id)) route.push(`/photo/${photo_label}?num=1`);
    setCurrentPhoto(fetchPhotoById(id));
  }

  function validatePhotoIndex(index: number): void {
    const inner_index = index - 1;
    if (!isValidPhotoIndex(inner_index)) {
      route.push(`/photo/${photo_label}?num=1`);
      return;
    }
    setCurrentPhoto(filtered_photo[inner_index]);
  }

  return (
    <>
      <Head>
        <title>{locationTitle ? `Location ${locationTitle}` : siteTitle}</title>
      </Head>
      <div className={`flex t-main-height justify-center items-center`}>
        {testPhotoRef && <ViewPhotoElment imageRef={testPhotoRef} />}
      </div>
    </>
  );
};

const apiUrl = process.env.API_URL;

export const getStaticPaths = async () => {
  const { data } = await axios.get(`${apiUrl}/locations`);
  const locations = data.locations;

  const params = locations.map((doc) => {
    return { params: { photo_label: doc } };
  });
  return {
    paths: [...params],
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { photo_label } }) => {
  const { data } = await axios.get(`${apiUrl}/images/${photo_label}`);
  return {
    props: {
      images: data.images,
    },
  };
};

export default memo(PhotoLabel);
