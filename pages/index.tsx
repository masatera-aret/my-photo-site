import React, { FC, useState, useEffect } from "react";
import Head from "next/head";
import TopPhotoViewer from "../components/TopPhotoViewer";
import SiteDiscription from "../components/SiteDiscription";
import Category from "../components/Category";
import { AnimatePresence, motion } from "framer-motion";

// export const getStaticProps = () => ({
//   props: {
//     layout: "test",
//   },
// });

const break_point = 650;

const Home: FC = () => {
  const [test, setTest]: any = useState("てすと");
  const [viewport_width, setViewportWidth] = useState(
    document.documentElement.clientWidth
  );

  const changeTest = () => {
    if (test === "てすと") return setTest("テスト");
    setTest("てすと");
  };

  useEffect(() => {
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
        {viewport_width <= break_point && <TopPhotoViewer />}
      </section>
      <section id={`site-description`}>
        <SiteDiscription />
      </section>
      <section id={`photo-category`}>
        <Category />
      </section>
      <button
        onClick={changeTest}
        className={`text-white bg-blue-500 hover:bg-blue-300`}
      >
        {test}
      </button>
    </>
  );
};

export default Home;
