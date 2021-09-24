import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import TopPhotoViewer from "../components/TopPhotoViewer";
import SiteDiscription from "../components/SiteDiscription";
import Category from "../components/Category";
import { StoreState } from "../store/index";

const break_point = 1250;

const Home: FC = () => {
  const [viewport_width, setViewportWidth] = useState<number>();
  const is_modal_active = useSelector(
    (state: StoreState) => state.is_modal_active
  );

  useEffect(() => {
    function docwidth() {
      setViewportWidth(document.documentElement.clientWidth);
    }
    docwidth();
    window.addEventListener("resize", docwidth);

    return () => {
      window.removeEventListener("resize", docwidth);
    };
  }, []);

  return (
    <>
      <Head>
        <title>タイトルです</title>
        {is_modal_active && <style>{`body {overflow-y: hidden}`}</style>}
      </Head>
      <div id={`top-view-photos`} className={`md:flex md:justify-between`}>
        <TopPhotoViewer />
        <section id={`site-description`}>
          <SiteDiscription />
        </section>
      </div>
      <div id={`photo-category`}>
        <Category />
      </div>
    </>
  );
};

export default Home;
