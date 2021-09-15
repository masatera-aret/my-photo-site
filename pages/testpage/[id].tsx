import React, { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Types from "../../assets/types/types";

import Egypt1 from "../../public/Egypt/_MG_5531.jpg";
import Egypt2 from "../../public/_MG_1914.jpg";
import Egypt3 from "../../public/Egypt/_MG_5721.jpg";
import Photo1 from "../../public/Egypt/_MG_6324.jpg";

const photo_list: Types.PhotoList[] = [
  { id: 1, src: Egypt1, alt: "エジプトの写真" },
  { id: 2, src: Egypt2, alt: "モロッコの写真" },
  { id: 3, src: Egypt3, alt: "モロッコの写真" },
  { id: 4, src: Photo1, alt: "テスト" },
];

const Id = () => {
  const route = useRouter();
  const id = route.query.id;
  return (
    <>
      <p>{route.query.id}</p>
      <Image src={photo_list[Number(id) - 1].src} />
    </>
  );
};

export default Id;
