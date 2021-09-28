import React from "react";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Plain: React.FC<ChildElement> = ({ children }) => {
  return <>{children}</>;
};

export default Plain;
