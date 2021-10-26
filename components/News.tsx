import React from "react";
import Link from "next/link";

type Props = {
  news: {
    title: string;
    date: string;
  }[];
};

const News = ({ news }: Props) => {
  return (
    <>
      <div className={`flex justify-center`}>
        <h1 className={`t-under-border text-green-600 inline-block`}>News</h1>
      </div>
      <ul className={`mt-5`}>
        {news &&
          news.map((f, index) => (
            <li
              key={index}
              className={`font-thin text-sm mb-2 last-of-type:mb-0`}
            >
              <Link href={`/news/${f.title}`}>
                <a>{f.title}</a>
              </Link>
              <time>{f.date}</time>
            </li>
          ))}
      </ul>
    </>
  );
};

export default News;
