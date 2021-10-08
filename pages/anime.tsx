import React, { useReducer } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { GetStaticProps } from "next";
import Image from "next/image";

const inirialState = {
  location: `egypt`,
};

type InitialState = typeof inirialState;

type Action = {
  type: string;
  payload?: any;
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case `egypt`:
      return { ...state, location: (state.location = `egypt`) };
    case `jordan`:
      return { ...state, location: (state.location = `jordan`) };
    default:
      return state;
  }
};

const Anime = ({
  imageUrls,
  topViewImages,
}: {
  imageUrls: Object;
  topViewImages: Array<string>;
}) => {
  const [{ location }, dispatch] = useReducer(reducer, inirialState);
  return (
    <div>
      <h1>anime</h1>
      <p>test</p>
      <div>
        {topViewImages &&
          topViewImages.map((url, index) => (
            <div
              key={index}
              className={`relative w-[350px] h-[350px] pointer-events-none`}
            >
              <Image src={url} layout={`fill`} objectFit={`contain`} alt="" />
            </div>
          ))}
      </div>
      {/* <button
        onClick={() => dispatch({ type: `egypt` })}
        className={`rounded bg-blue-400 text-white p-2`}
      >
        egypt
      </button>
      <button
        onClick={() => dispatch({ type: `jordan` })}
        className={`rounded bg-blue-400 text-white p-2`}
      >
        jordan
      </button>
      <div>
        {imageUrls[location].map((el: string, index: number) => (
          <img key={index} src={el} alt={``} />
        ))}
      </div> */}
    </div>
  );
};

const storage = getStorage();
const imagesRef = ref(storage, `images`);

const fetchImagesDirNames = async () => {
  const res = await listAll(imagesRef).catch((err) => console.log(err));
  if (!res) return;
  const dirNames = await Promise.all(
    res.prefixes.map((el) => {
      return el.name;
    })
  );
  return dirNames;
};

export const getStaticProps: GetStaticProps = async () => {
  const imagesDirName = await fetchImagesDirNames();
  const imageDirRefs = imagesDirName.map((dirName) => {
    return ref(storage, `images/${dirName}`);
  });

  const lists = await Promise.all(
    imageDirRefs.map(async (ref) => {
      return await listAll(ref).catch((e) => console.log(e));
    })
  );

  let imageUrls = {};
  imagesDirName.forEach((el) => {
    imageUrls = { ...imageUrls, [el]: [] };
  });

  await Promise.all(
    lists.flatMap((el) => {
      if (!el) return;
      const urls = el.items.map(async (item) => {
        const url = await getDownloadURL(ref(storage, item.fullPath));
        const locationName = item.parent.name;
        imageUrls[locationName] = [...imageUrls[locationName], url];
      });
      return urls;
    })
  );

  function getRondomIndexNum(length: number) {
    return Math.floor(Math.random() * length);
  }

  const topViewImages = Object.keys(imageUrls).map((key) => {
    const length = imageUrls[key].length;
    const index = getRondomIndexNum(length);
    return imageUrls[key][index];
  });

  return {
    props: {
      imageUrls,
      topViewImages,
    },
  };
};

export default Anime;
