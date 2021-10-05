import React, { useState, useEffect, useRef } from "react";
import styles from "@/assets/css/anime.module.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Test from "@/components/test_component/Test";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Loading from "@/components/Loading";
import Img from "next/image";

const storage = getStorage();
const listRef = ref(storage, `Egypt`);
const storageRef = ref(storage);

const Anime: React.FC = () => {
  console.log("レンダリング");
  const [imageUrl, setImageUrl] = useState<any>();
  const [urls, setUrls] = useState<(string | void)[]>();
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  function startAnimate() {
    setIsVisible((state) => !state);
    setIsVisible((state) => {
      if (state) {
        controls.start(
          (i) => i === 0 && { rotate: 45, y: "135px", width: "100%" }
        );
        controls.start((i) => i === 1 && { opacity: 0, width: "0" });
        controls.start((i) => i === 2 && { rotate: -45, y: "-135px" });
      }
      if (!state) {
        controls.start((i) => i === 0 && { rotate: 0, y: "0px", width: "50%" });
        controls.start((i) => i === 1 && { opacity: 1, width: "75%" });
        controls.start((i) => i === 2 && { rotate: 0, y: "0px" });
      }
      return state;
    });
  }

  useEffect(() => {
    (async () => {
      const res = await listAll(listRef).catch((err) => console.log(err));
      if (!res) return;
      const url = await Promise.all(
        res.items.map(async (el) => {
          const data = getDownloadURL(ref(storage, el.fullPath)).catch((err) =>
            console.log(err)
          );
          return data;
        })
      );
      setImageUrl(url);
    })();
  }, []);

  useEffect(() => {
    if (!imageUrl) return;
    console.log("imageUrl", imageUrl);
  }, [imageUrl]);

  return (
    <>
      <AnimatePresence>{!imageUrl && <Loading />}</AnimatePresence>
      <div className={`w-[300px] h-[300px]`}>
        <div
          className={`relative w-full h-full bg-red-400`}
          onClick={startAnimate}
        >
          <motion.span
            className={`absolute top-0 left-0 inline-block w-1/2 h-[10%] bg-black`}
            custom={0}
            animate={controls}
            transition={{ duration: 1 }}
          ></motion.span>
          <motion.span
            className={`absolute top-[45%] left-0 inline-block w-3/4 h-[10%] bg-black`}
            custom={1}
            animate={controls}
            transition={{ duration: 1 }}
          ></motion.span>
          <motion.span
            className={`absolute bottom-0 left-0 inline-block w-full h-[10%] bg-black`}
            custom={2}
            animate={controls}
            transition={{ duration: 1 }}
          ></motion.span>
        </div>
        <button className={styles.test} onClick={startAnimate}>
          ボタン
        </button>
      </div>
      <Test />
      <div className={`bg-green-400`}>
        {imageUrl &&
          imageUrl.map((el: string, index: number) => (
            <div key={index} className={`relative`}>
              <Img key={index} src={el} width={250} height={250} alt="" />
            </div>
          ))}
      </div>
    </>
  );
};

export default Anime;
