import Image from "next/image";
import { useEffect, useState } from "react";
import Egypt1 from "../public/Egypt/_MG_5531.jpg";
import Egypt2 from "../public/_MG_1914.jpg";
import Egypt3 from "../public/Egypt/_MG_5721.jpg";

type PhotoList = {
  id: number;
  src: StaticImageData;
  alt: string;
};

const PhotosList = () => {
  const photo_lists: PhotoList[] = [
    { id: 1, src: Egypt1, alt: "エジプトの写真" },
    { id: 2, src: Egypt2, alt: "モロッコの写真" },
    { id: 3, src: Egypt3, alt: "モロッコの写真" },
  ];

  const break_point = 650;

  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [photo_id, setPhoto_id] = useState(1);

  const click = () => {
    const leng = photo_lists.length;
    if (leng <= photo_id) return setPhoto_id(1);
    setPhoto_id(photo_id + 1);
  };

  useEffect(() => {
    window.addEventListener("resize", () =>
      setWidth(document.documentElement.clientWidth)
    );
  }, []);

  useEffect(() => {
    // setInterval(click, 5000);
  });

  const PhotoListsRender = photo_lists.map((photo) => (
    <div key={photo.id} className={`px-7 pt-7`}>
      <div className={`w-full h-auto t-box relative bg-blue-300`}>
        <Image
          layout="fill"
          objectFit="cover"
          src={photo.src}
          alt={photo.alt}
        />
      </div>
    </div>
  ));

  const TestContent = photo_lists.map((photo) => (
    <div
      key={photo.id}
      className={`absolute top-0 w-full h-full max-w-[700px] px-7 pt-7 duration-300 ${
        photo_id === photo.id ? `opacity-100` : `opacity-0`
      }`}
    >
      <div className={`w-full h-auto t-box relative bg-blue-300`}>
        <Image
          layout="fill"
          objectFit="cover"
          src={photo.src}
          alt={photo.alt}
        />
      </div>
    </div>
  ));

  return (
    <>
      {/* {width < break_point ? PhotoListsRender : <div>れすぽんしぶ</div>} */}
      <div className={`relative pt-[100%]`}>{TestContent}</div>
      <button className={`t-button`} onClick={click}>
        くりっく
      </button>
    </>
  );
};

export default PhotosList;
