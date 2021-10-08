import React from "react";
import Image from "next/image";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const Location = ({ url, location }: { url: string[]; location: string }) => {
  return (
    <div>
      {location && <h1>{location}のページ</h1>}
      <div>
        {url.map((el) => (
          <div key={el} className={`relative w-[500px] h-[500px]`}>
            <Image
              src={el}
              layout={`fill`}
              objectFit={`contain`}
              alt={"photo"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const storage = getStorage();
const storageRef = ref(storage, `images`);

const fetchImagesDirNames = async () => {
  const res = await listAll(storageRef).catch((err) => console.log(err));
  if (!res) return;
  const photoDir = await Promise.all(
    res.prefixes.map((el) => {
      return el.name;
    })
  );
  return photoDir;
};

export const getStaticPaths = async () => {
  const photoDir = await fetchImagesDirNames();
  const paths = photoDir.map((el) => {
    return { params: { location: el } };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { location } }) => {
  const imageDirRef = ref(storage, `images/${location}`);

  const res = await listAll(imageDirRef).catch((err) => console.log(err));
  if (!res) return;
  const url = await Promise.all(
    res.items.map((el) => {
      const data = getDownloadURL(ref(storage, el.fullPath)).catch((err) =>
        console.log(err)
      );
      return data;
    })
  );
  console.log(url);
  return {
    props: {
      url,
      location,
    },
  };
};

export default Location;
