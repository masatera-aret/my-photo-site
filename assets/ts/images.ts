import * as Types from "./types/types"

import Egypt1 from "../../public/Egypt/_MG_5531.jpg";
import Egypt2 from "../../public/Egypt/_MG_5721.jpg";
import Egypt3 from "../../public/Egypt/_MG_6327.jpg";
import Egypt4 from "../../public/Egypt/_MG_6324.jpg";
import Egypt5 from "../../public/Egypt/_MG_6357.jpg";

import Turkey1 from "../../public/Turkey/_MG_3775.jpg";
import Turkey2 from "../../public/Turkey/_MG_3813.jpg";
import Turkey3 from "../../public/Turkey/_MG_3841.jpg";
import Turkey4 from "../../public/Turkey/_MG_4037.jpg";
import Turkey5 from "../../public/Turkey/_MG_4264.jpg";


export const all_photos: Types.PhotoList[] = [
  //エジプト
  { id: 1, src: Egypt1, label: "Egypt", alt: "エジプトの写真" },
  { id: 2, src: Egypt2, label: "Egypt", alt: "エジプトの写真" },
  { id: 3, src: Egypt3, label: "Egypt", alt: "エジプトの写真" },
  { id: 4, src: Egypt4, label: "Egypt", alt: "エジプトの写真" },
  { id: 5, src: Egypt5, label: "Egypt", alt: "エジプトの写真" },
  //トルコ
  { id: 6, src: Turkey1, label: "Turkey", alt: "トルコの写真" },
  { id: 7, src: Turkey2, label: "Turkey", alt: "トルコの写真" },
  { id: 8, src: Turkey3, label: "Turkey", alt: "トルコの写真" },
  { id: 9, src: Turkey4, label: "Turkey", alt: "トルコの写真" },
  { id: 10, src: Turkey5, label: "Turkey", alt: "トルコの写真" },
]

export const top_view_photos: Types.PhotoList[] = [
  { id: 1, src: Egypt1, label: "Egypt", alt: "エジプトの写真" },
  { id: 3, src: Egypt3, label: "Egypt", alt: "エジプトの写真" },
  { id: 7, src: Turkey2, label: "Turkey", alt: "トルコの写真" },
  { id: 8, src: Turkey3, label: "Turkey", alt: "トルコの写真" },
]

export const category: Types.PhotoList[] = [
  { id: 4, src: Egypt4, label: "Egypt", alt: "エジプトの写真" },
  { id: 10, src: Turkey5, label: "Turkey", alt: "トルコの写真" },
]
