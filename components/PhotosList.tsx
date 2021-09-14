import React, { FC } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Egypt1 from "../public/Egypt/_MG_5531.jpg";
import Egypt2 from "../public/_MG_1914.jpg";
import Egypt3 from "../public/Egypt/_MG_5721.jpg";
import Photo1 from "../public/Egypt/_MG_6324.jpg";

type PhotoList = {
  id: number;
  src: StaticImageData;
  alt: string;
};

const PhotosList: FC = () => {
  const photo_list: PhotoList[] = [
    { id: 1, src: Egypt1, alt: "エジプトの写真" },
    { id: 2, src: Egypt2, alt: "モロッコの写真" },
    { id: 3, src: Egypt3, alt: "モロッコの写真" },
    { id: 4, src: Photo1, alt: "テスト" },
  ];
  const nodeRef = React.useRef(null);
  const break_point = 650;
  const photos_length = photo_list.length;

  const [viewport_width, setViewportWidth] = useState(
    document.documentElement.clientWidth
  );
  const [current_photo_id, setCurrentPhotoId] = useState<number>();

  const getInitialPhotoId = (photos_length: number): void => {
    const min = 1;
    const max = photos_length;
    const photo_id = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoId(photo_id);
  };

  const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const execPhotoSlider = async (ms: number): Promise<void> => {
    await wait(ms);
    if (photos_length <= current_photo_id) return setCurrentPhotoId(1);
    setCurrentPhotoId(current_photo_id + 1);
  };

  useEffect(() => {
    window.addEventListener("resize", () =>
      setViewportWidth(document.documentElement.clientWidth)
    );
    getInitialPhotoId(photos_length);
  }, []);

  useEffect(() => {
    execPhotoSlider(6000);
  }, [current_photo_id]);

  const PhotoListsRender: JSX.Element[] = photo_list.map((photo) => (
    <CSSTransition
      unmountOnExit
      appear
      key={photo.id}
      timeout={1000}
      in={current_photo_id === photo.id}
      classNames={`fade`}
      className={`w-full h-auto t-box relative`}
    >
      <Image layout="fill" objectFit="cover" src={photo.src} alt={photo.alt} />
    </CSSTransition>
  ));

  return (
    viewport_width <= break_point && (
      <div className={`p-7`}>
        <div className={`relative pt-[100%]`}>{PhotoListsRender}</div>
      </div>
    )
  );
};

export default PhotosList;
