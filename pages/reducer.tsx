import React from "react";
import Compo1 from "@/components/test_reducer/Compo1";
import { CountReducerProvider } from "@/components/test_reducer/CountReducerContext";

const Reducer = () => {
  return (
    <div className={`bg-red-200 p-5`}>
      <p>reducer</p>
      <CountReducerProvider>
        <Compo1 />
      </CountReducerProvider>
    </div>
  );
};

export default Reducer;
