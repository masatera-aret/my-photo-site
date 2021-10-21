import React, { useState } from "react";
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

const Home: React.FC = ({
  newsData,
  allImages,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(allImages);
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);
  const [news] = useState(newsData !== undefined && newsData.data);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        {isModalActive && <style>{`body {overflow-y: hidden}`}</style>}
      </Head>
      <div className={`md:flex md:justify-between`}>
        <TopPhotoViewer />
        <section className={`md:w-1/3 flex md:justify-end`}>
          <SiteDiscription />
        </section>
      </div>
      <div className={`mt-5`}>
        <News news={news} />
      </div>
      <div>
        <Location />
      </div>
    </>
  );
};

import {
  getFirestore,
  collection,
  limit,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
} from "firebase/firestore";

// firestore
const db = getFirestore();
const collectionNews = collection(db, "news");
const docRef = collection(db, `images`, `egypt`, `images`);

export const getStaticProps: GetStaticProps = async () => {
  // `newsの取得
  const apiUrl = process.env.API_URL;
  try {
    const newsData = await axios.get(`${apiUrl}/news`);
    const allImages = await axios.get(`${apiUrl}/all_images`);
    return {
      props: {
        newsData: newsData.data,
        allImages: allImages.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Home;
