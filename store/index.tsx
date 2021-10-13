import { createStore } from "redux";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { runMain } from "module";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);
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

const test = async () => {
  let images = {};
  const imageDirName = await fetchImagesDirNames();
  await Promise.all(
    imageDirName.map(async (dirname) => {
      const dirRef = ref(storage, `images/${dirname}`);
      const list = await listAll(dirRef);
      let id = 0;
      const urls = await Promise.all(
        list.items.map(async (el) => {
          const url = await getDownloadURL(ref(storage, el.fullPath));
          id += 1;
          return { id: id, url: url };
        })
      );
      images = { ...images, [dirname]: urls };
      return urls;
    })
  );
  return images;
};

console.log(test());

export type StoreState = ReturnType<typeof reducer>;
type Action = { type: string };

const initialSatate = {
  isModalActive: false,
  breakpoint: 768,
  siteTitle: "Journey's Photo",
  images: test(),
};

const reducer = (state = initialSatate, action: Partial<Action>) => {
  switch (action.type) {
    case `active`:
      return {
        ...initialSatate,
        isModalActive: true,
      };
    case `inactive`:
      return {
        ...initialSatate,
        isModalActive: false,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
