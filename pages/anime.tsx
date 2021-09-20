import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const fade_variants = {
  hide: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Anime = () => {
  const [is_visible, setIsVisible] = useState(true);
  return (
    <>
      <div>
        <p>あにめ</p>
      </div>
      <button onClick={() => setIsVisible(!is_visible)}>ぼたん</button>
      <AnimatePresence>
        {is_visible && (
          <motion.div
            initial={`hide`}
            animate={`visible`}
            exit={`hide`}
            whileHover={{ scale: 0.8, transition: { duration: 0.3 } }}
            variants={fade_variants}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => console.log("on mouse enter")}
            onMouseLeave={() => console.log("leave")}
            className={`w-[300px] h-[300px] bg-blue-300`}
          >
            テスト
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Anime;
