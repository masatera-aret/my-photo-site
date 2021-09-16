import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../store/index";

const Humburger = () => {
  const dispatch = useDispatch();
  const is_modal_active = useSelector(
    (state: StoreState) => state.is_modal_active
  );
  return (
    <>
      <div
        onClick={() =>
          dispatch({ type: is_modal_active ? `inactive` : `active` })
        }
        className={`v-hamburger items-center ${is_modal_active && `v-active`}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <style jsx>
        {`
          .v-hamburger {
            position: relative;
            width: 20px;
            height: 15px;
            background: none;
            border: none;
            appearance: none;
            cursor: pointer;
          }
          .v-hamburger,
          .v-hamburger span {
            display: inline-block;
            transition: all 0.4s;
            box-sizing: border-box;
          }
          .v-hamburger span {
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #000000;
            /* border-radius: 2px; */
          }
          .v-hamburger span:nth-of-type(1) {
            top: 0;
          }
          .v-hamburger.v-active span:nth-of-type(1) {
            transform: translateY(7px) rotate(-45deg);
          }

          .v-hamburger span:nth-of-type(2) {
            top: 7px;
            transition: all 0.25s;
            opacity: 1;
          }
          .v-hamburger.v-active span:nth-of-type(2) {
            opacity: 0;
          }

          .v-hamburger span:nth-of-type(3) {
            bottom: 0;
          }
          .v-hamburger.v-active span:nth-of-type(3) {
            transform: translateY(-7px) rotate(45deg);
          }
        `}
      </style>
    </>
  );
};

export default Humburger;
