import React, { FC } from "react";

const SiteDiscription: FC = () => {
  return (
    <>
      <div className={`font-serif px-2 pt-5 font-thin text-gray-500`}>
        <h1 className={`text-xl font-bold mb-5`}>良く写真を撮っていた</h1>
        <p
          className={`md:text-right text-xs leading-7 tracking-widest md:tracking-tight`}
        >
          ただ写真を掲載しているWebサイトです <br />
          写真が好きで血迷って4×5カメラを買った事もあります <br />
          良く旅行に行ったので、その時の写真が多いです <br />
          写真を眺めてると撮りたくなります <br />
          自分の写真を眺めてると特に撮りたくなります <br />
          だから作ったWebサイトです
        </p>
      </div>
      <style jsx>{`
        .c-test {
          font-size: 10px;
        }
      `}</style>
    </>
  );
};

export default SiteDiscription;
