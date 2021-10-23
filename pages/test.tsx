import React from "react";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import axios from "axios";

type Post = { filename: any; content: any };

type Props = {
  posts: Post[];
};

const Test = ({ posts }: Props) => {
  return (
    <div className={`bg-red-200 p-5`}>
      <h1>Test page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.filename} className={`rounded bg-blue-400 p-3 mt-5`}>
            <h3>ファイル名:{post.filename}</h3>
            <p>コンテンツ:{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postDirectoy = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postDirectoy);

  const posts = filenames
    .map((filename) => {
      const filepath = path.join(postDirectoy, filename);
      const file = fs.statSync(filepath);
      if (file.isDirectory()) return;
      const fileContents = fs.readFileSync(filepath, `utf-8`);
      return { filename, content: fileContents };
    })
    .filter((el) => el !== undefined);
  return {
    props: {
      posts,
    },
  };
};

export default Test;
