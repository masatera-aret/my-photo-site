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
import {
  getFirestore,
  collection,
  limit,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

// firestore
const db = getFirestore();
const admin = collection(db, "admin");

export const getStaticProps: GetStaticProps = async () => {
  // `getStaticProps` はサーバー側で実行されます
  const newsData = [];
  const res = await getDocs(
    query(admin, orderBy("timestamp", "desc"), limit(5))
  );
  res.docs.map((doc) => {
    const timestamp = doc.data().timestamp.toDate();
    newsData.push({ news: doc.data().news, timestamp });
  });
  const json = JSON.stringify(newsData);
  return {
    props: {
      newsData: json,
    },
  };
};

const Home: React.FC = ({
  newsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);
  const [news] = useState(newsData !== undefined && JSON.parse(newsData));

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

export default Home;
