import React, { FC, useState, useEffect } from "react";
import Head from "next/head";
import PhotosList from "../components/PhotosList";
import { AnimatePresence, motion } from "framer-motion";

export const getStaticProps = () => ({
  props: {
    layout: "test",
  },
});

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
      <div className={`bg-blue-300`}>test</div>
      <button
        onClick={changeTest}
        className={`text-white bg-blue-500 hover:bg-blue-300`}
      >
        {test}
      </button>
      {viewport_width <= break_point && <PhotosList />}
      <div>
        <ul>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {test}
          </motion.li>
          <li>なんかおかしい</li>
          <li>なんかおかしい</li>
        </ul>
      </div>
    </>
  );
};

export default Home;
