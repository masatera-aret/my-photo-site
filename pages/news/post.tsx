import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import firebaseConfig from "@/assets/ts/firebase/firebaseConfig";

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const admin = collection(db, "admin");

type typeNews = {
  news: string;
  timestamp: { seconds: number; nanoseconds: number };
};

export const getStaticProps: GetStaticProps = async () => {
  // `getStaticProps` はサーバー側で実行されます
  const newsData = [];
  const res = await getDocs(query(admin, orderBy("timestamp", "desc")));
  res.docs.map((doc) => {
    newsData.push(doc.data());
  });
  const json = JSON.stringify(newsData);
  return {
    props: {
      newsData: json,
      layout: "plain",
    },
  };
};

const Post: React.FC = ({
  newsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [newNews, setNewNews] = useState<string>("");
  const [testData, setTestData] = useState<typeNews[]>(JSON.parse(newsData));

  async function click(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      const news = await addDoc(admin, {
        news: newNews,
        timestamp: serverTimestamp(),
      });
      console.log(news.id);
      setNewNews("");
    } catch (err) {
      console.log("Error発生", err);
    }
  }

  const auth = getAuth();
  function Logout() {
    signOut(auth)
      .then(() => router.push(`/login`))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log(auth.currentUser);
    if (!auth.currentUser) router.push(`/login`);
  }, []);

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <div>
        <h1>Post</h1>
        <button onClick={Logout} className={`bg-red-600 text-white py-1 px-3`}>
          ログアウト
        </button>
        <form>
          <input
            type="text"
            value={newNews}
            id={`news`}
            onChange={(e) => setNewNews(e.target.value)}
          />
          <button
            className={`bg-green-400 text-white py-1 px-3`}
            onClick={(e) => click(e)}
          >
            テスト
          </button>
        </form>
        <div>
          <ul>
            {testData &&
              testData.map((el, index) => <li key={index}>{el.news}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Post;
