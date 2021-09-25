import React, { useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

const Anime = () => {
  const [is_visible, setIsVisible] = useState(false);
  const controls = useAnimation();
  function startAnimate() {
    setIsVisible((state) => !state);
    setIsVisible((state) => {
      if (state) {
        controls.start(
          (i) => i === 0 && { rotate: 45, y: "135px", width: "100%" }
        );
        controls.start((i) => i === 1 && { opacity: 0, width: "100%" });
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
  return (
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
      <button onClick={startAnimate}>ボタン</button>
    </div>
  );
};

export default Anime;
