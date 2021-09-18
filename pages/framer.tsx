import React, { FC, useState } from "react";
import { motion } from "framer-motion";

const Framer = () => {
  const variants = {
    animate: {
      rotate: 180,
      transition: { repeat: Infinity, repeatType: "mirror", duration: 2 },
    },
  };
  const [test, setTest] = useState(true);
  return (
    <>
      <motion.ul>
        <motion.li
          animate={{ rotate: 180 }}
          transition={{ repeat: 1, repeatType: "reverse", duration: 2 }}
          className={`bg-blue-400 w-10 h-10`}
        />
        <motion.li className={`bg-red-400 w-10 h-10`} />
      </motion.ul>
      <button onClick={() => setTest(!test)}>ぼたん</button>
    </>
  );
};

export default Framer;
