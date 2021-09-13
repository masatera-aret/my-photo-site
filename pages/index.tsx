import React, { useState, useEffect } from "react";
import Head from "next/head";
import Test from "../components/TestComponent";
import PhotosList from "../components/PhotosList";

export const getStaticProps = () => ({
  props: {
    layout: "test",
  },
});

export default function Home() {
  const [test, setTest]: any = useState(window);

  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>タイトルです</title>
      </Head>
      <div className={`bg-blue-300`}>test</div>
      <Test />
      <button
        onClick={() => setTest("チェンジ")}
        className={`text-white bg-blue-500 hover:bg-blue-300`}
      >
        てすと
      </button>
      <PhotosList />
      <div>
        <ul>
          <li>なんかおかしい</li>
          <li>なんかおかしい</li>
          <li>なんかおかしい</li>
        </ul>
      </div>
    </>
  );
}
