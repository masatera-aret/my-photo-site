import React, { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index";
import Head from "next/head";
import ViewPhotoElment from "@/components/photo_label/ViewPhotoElment";
import axios from "axios";
import { ImageType } from "@/pages/index";

type ParamsType = {
  images: ImageType[];
  // photo: ImageType;
};

const PhotoLabel: React.FC<ParamsType> = ({ images }) => {
  const sortdImages = images.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });
  const route = useRouter();
  const { photo_label, id, num } = route.query;
  const [testPhotoRef, setTestPhotoRef] = useState<ImageType>();

  useEffect(() => {
    const img = images.find((e) => e.id === `${photo_label}_${id}`);
    setTestPhotoRef(img);
  }, [id]);

  const locationTitle =
    typeof photo_label === "string" && photo_label.toUpperCase();
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);

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
