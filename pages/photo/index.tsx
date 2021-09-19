import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";

const Photo: FC = () => {
  const route = useRouter();
  useEffect(() => {
    route.replace(`/`);
  }, []);
  return <></>;
};

export default Photo;
