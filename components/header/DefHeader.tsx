import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DefHeader: FC = () => {
  const [is_modal_state, setModalState] = useState(false);

  return (
    <>
      <header className={`t-def-header bg-gray-100 flex`}>
        <p>def-header</p>
        <div
          onClick={() => setModalState(!is_modal_state)}
          className={`n-hamburger my-auto ${is_modal_state && `n-active`}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <style jsx>
        {`
          .n-hamburger {
            position: relative;
            width: 20px;
            height: 15px;
            background: none;
            border: none;
            appearance: none;
            cursor: pointer;
          }
          .n-hamburger,
          .n-hamburger span {
            display: inline-block;
            transition: all 0.4s;
            box-sizing: border-box;
          }
          .n-hamburger span {
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #000000;
            border-radius: 2px;
          }
          .n-hamburger span:nth-of-type(1) {
            top: 0;
          }
          .n-hamburger.n-active span:nth-of-type(1) {
            transform: translateY(7px) rotate(-45deg);
          }

          .n-hamburger span:nth-of-type(2) {
            top: 7px;
            transition: all 0.25s;
            opacity: 1;
          }
          .n-hamburger.n-active span:nth-of-type(2) {
            opacity: 0;
          }

          .n-hamburger span:nth-of-type(3) {
            bottom: 0;
          }
          .n-hamburger.n-active span:nth-of-type(3) {
            transform: translateY(-7px) rotate(45deg);
          }
        `}
      </style>
    </>
  );
};

export default DefHeader;
