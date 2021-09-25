import React, { FC, useState } from "react";
import { motion, useViewportScroll } from "framer-motion";

const Framer = () => {
  const variants = {
    animate: {
      rotate: 180,
      transition: { repeat: Infinity, repeatType: "mirror", duration: 2 },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // repeat: Infinity,
        delayChildren: 0.5,
      },
    },
  };

  const [test, setTest] = useState(true);
  return (
    <>
      <motion.ul>
        <motion.li
          animate={{ rotate: 180 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
          className={`bg-blue-400 w-10 h-10`}
        />
        <motion.li className={`bg-red-400 w-10 h-10`} />
      </motion.ul>
      <button onClick={() => setTest(!test)}>ぼたん</button>

      <div>
        <motion.ol variants={container} initial="hidden" animate="show">
          <motion.li className={`inline`} variants={item}>
            L
          </motion.li>
          <motion.li className={`inline`} variants={item}>
            o
          </motion.li>
          <motion.li className={`inline`} variants={item}>
            a
          </motion.li>
          <motion.li className={`inline`} variants={item}>
            d
          </motion.li>
        </motion.ol>
      </div>
    </>
  );
};

export default Framer;
