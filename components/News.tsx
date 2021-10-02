import React from "react";
import moment from "moment";

type typeNews = {
  news: string;
  timestamp: any;
};

const News = ({ news }) => {
  return (
    <>
      <div className={`flex justify-center`}>
        <h1 className={`t-under-border text-green-600 inline-block`}>News</h1>
      </div>
      <ul className={`mt-5`}>
        {news &&
          news.map((el: typeNews, index) => (
            <li
              key={index}
              className={`font-thin text-sm mb-2 last-of-type:mb-0`}
            >
              {`${el.news}${moment(el.timestamp).format(`YYYY/M/D`)}`}
            </li>
          ))}
      </ul>
    </>
  );
};

export default News;
