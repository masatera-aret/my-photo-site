import { createStore } from "redux";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/assets/ts/firebase/firebaseConfig";

// Initialize Firebase
initializeApp(firebaseConfig);

export type StoreState = ReturnType<typeof reducer>;
type Action = { type: string };

console.log("store");
const initial_satate = {
  isModalActive: false,
  breakpoint: 768,
  siteTitle: "Journey's Photo",
};

const reducer = (state = initial_satate, action: Partial<Action>) => {
  switch (action.type) {
    case `active`:
      return {
        ...initial_satate,
        isModalActive: true,
      };
    case `inactive`:
      return {
        ...initial_satate,
        isModalActive: false,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
