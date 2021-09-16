import React, { FC, useState, useEffect } from "react";
import Head from "next/head";
import PhotosList from "../components/PhotosList";
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
        {viewport_width <= break_point && <PhotosList />}
      </section>
      <section id={`site-description`}>
        <div className={`mt-4 p-2 border text-xs font-thin text-gray-500`}>
          ただ写真を掲載しているサイトです <br />
          良く旅行に行ったので、その時の写真が多いです <br />
          写真を眺めてると撮りたくなります <br />
          自分の写真を眺めてると得に撮りたくなります <br />
          だから作ってみたサイトです
        </div>
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
