import React, { FC, useState, useEffect } from "react";
import Head from "next/head";
import TopPhotoViewer from "../components/TopPhotoViewer";
import SiteDiscription from "../components/SiteDiscription";
import Category from "../components/Category";

const break_point = 1250;

const Home: FC = () => {
  const [viewport_width, setViewportWidth] = useState<number>();

  useEffect(() => {
    setViewportWidth(document.documentElement.clientWidth);
    window.addEventListener("resize", () =>
      setViewportWidth(document.documentElement.clientWidth)
    );
  }, []);

  return (
    <>
      <Head>
        <title>タイトルです</title>
      </Head>
      <section id={`top-view-photos`}>
        {viewport_width <= break_point ? (
          <TopPhotoViewer />
        ) : (
          <div className={`w-[300px] h-[300px] bg-gray-800`}>テスト用</div>
        )}
      </section>
      <section id={`site-description`}>
        <SiteDiscription />
      </section>
      <section id={`photo-category`}>
        <Category />
      </section>
    </>
  );
};

export default Home;
