import React from "react";
import { motion } from "framer-motion";

const LoadingModal = (): JSX.Element => {
  const loading = Array.from("Loading...");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.1 }}
      className={`fixed top-0 left-0 w-full min-h-screen bg-white flex justify-center items-center z-20`}
    >
      <div
        className={`t-loading-text select-none absolute bg-green-600 py-5 px-7`}
      >
        {loading.map((el, index) => (
          <motion.p
            key={index}
            custom={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
              },
            }}
            className={`inline text-white text-md tracking-widest font-extralight`}
          >
            {el}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingModal;
