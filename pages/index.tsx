import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import TopPhotoViewer from "@/components/top-photo-viewer/TopPhotoViewer";
import SiteDiscription from "@/components/SiteDiscription";
import Location from "@/components/photo-category/Location";
import News from "@/components/News";
import { StoreState } from "@/store/index";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import axios from "axios";

type Params = {
  newsData: any;
  allImages: Record<string, ImageType[]>;
  topImagesByRandom: ImageType[];
  locations: ImageType[];
};

const Home = ({
  newsData,
  allImages,
  topImagesByRandom,
  locations,
}: Params) => {
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);
  const [news] = useState(newsData !== undefined && newsData);

  // imageのpre-loading
  useEffect(() => {
    topImagesByRandom.forEach((el) => {
      const img = new Image();
      img.src = el.url;
    });
  }, []);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        {isModalActive && <style>{`body {overflow-y: hidden}`}</style>}
      </Head>
      <div className={`md:flex md:justify-between`}>
        <TopPhotoViewer
          topImagesByRandom={topImagesByRandom}
          allImages={allImages}
        />
        <section className={`md:w-1/3 flex md:justify-end`}>
          <SiteDiscription />
        </section>
      </div>
      <div className={`mt-5`}>
        <News news={news} />
      </div>
      <div>
        <Location locations={locations} />
      </div>
    </>
  );
};

import { getFirestore } from "firebase/firestore";
// firestore
const db = getFirestore();

export type ImageType = {
  documentId: string;
  id: string;
  url: string;
  filename: string;
};

export const getStaticProps: GetStaticProps = async () => {
  // newsとトップ画面に表示する用のimageとstorageにあるimage全てを取得
  const apiUrl = process.env.API_URL;
  try {
    const newsData = await axios.get(`${apiUrl}/news`);
    const allImagesData = await axios.get(`${apiUrl}/all_images`);
    const allImages: Record<string, ImageType[]> = allImagesData.data;

    const topImagesByRandom = Object.keys(allImages)
      .map((key) => {
        const length = allImages[key].length;
        const min = 0;
        const max = length - 1;
        const randam = Math.floor(Math.random() * (max + 1 - min)) + min;
        return allImages[key][randam];
      })
      .filter((e) => e !== undefined);

    const locations = Object.keys(allImages).map((key) => {
      const length = allImages[key].length;
      const min = 0;
      const max = length - 1;
      let isSame: boolean;
      let randomLocation: ImageType;
      do {
        const randam = Math.floor(Math.random() * (max + 1 - min)) + min;
        randomLocation = allImages[key][randam];
        isSame = topImagesByRandom.some((e) => e.id === randomLocation.id);
      } while (isSame);
      return randomLocation;
    });

    return {
      props: {
        newsData: newsData.data,
        allImages: allImages,
        locations: locations,
        topImagesByRandom,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Home;
