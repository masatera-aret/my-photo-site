import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import TopPhotoViewer from "../components/TopPhotoViewer";
import SiteDiscription from "../components/SiteDiscription";
import Category from "../components/Category";
import MidCategory from "../components/MidCategory";
import { StoreState } from "../store/index";

const Home: FC = () => {
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);
  const [isViewPortMid, setIsViewPortMid] = useState<boolean>();

  let width: number;
  useEffect(() => {
    function docWidth() {
      width = document.documentElement.clientWidth;
      let isMid: boolean = false;
      if (768 < width) isMid = true;
      setIsViewPortMid(isMid);
      setIsViewPortMid((state) => {
        return state;
      });
    }
    docWidth();
    window.addEventListener("resize", docWidth);

    return () => {
      window.removeEventListener("resize", docWidth);
    };
  }, []);

  return (
    <>
      <Head>
        <title>タイトルです</title>
        {isModalActive && <style>{`body {overflow-y: hidden}`}</style>}
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
