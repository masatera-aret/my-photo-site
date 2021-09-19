import * as Types from "./types/types"

import Egypt1 from "../../public/Egypt/_MG_5531.jpg";
import Egypt2 from "../../public/Egypt/_MG_5721.jpg";
import Egypt3 from "../../public/Egypt/_MG_6327.jpg";
import Egypt4 from "../../public/Egypt/_MG_6324.jpg";
import Egypt5 from "../../public/Egypt/_MG_6357.jpg";
import Egypt6 from "../../public/Egypt/_MG_6388.jpg";
import Egypt7 from "../../public/Egypt/_MG_6621.jpg";

import Turkey1 from "../../public/Turkey/_MG_3775.jpg";
import Turkey2 from "../../public/Turkey/_MG_3813.jpg";
import Turkey3 from "../../public/Turkey/_MG_3841.jpg";
import Turkey4 from "../../public/Turkey/_MG_4037.jpg";
import Turkey5 from "../../public/Turkey/_MG_4095.jpg";
import Turkey6 from "../../public/Turkey/_MG_4135.jpg";
import Turkey7 from "../../public/Turkey/_MG_4264.jpg";
import Turkey8 from "../../public/Turkey/_MG_4296.jpg";
import Turkey9 from "../../public/Turkey/_MG_4308.jpg";
import Turkey10 from "../../public/Turkey/_MG_4321.jpg";
import Turkey11 from "../../public/Turkey/_MG_4810.jpg";
import Turkey12 from "../../public/Turkey/_MG_4846.jpg";
import Turkey13 from "../../public/Turkey/_MG_4907.jpg";
import Turkey14 from "../../public/Turkey/_MG_5266.jpg";
import Turkey15 from "../../public/Turkey/_MG_5272.jpg";
import Turkey16 from "../../public/Turkey/_MG_5330.jpg";
import Turkey17 from "../../public/Turkey/_MG_3836-1.jpg";
import Turkey18 from "../../public/Turkey/_MG_4663-1.jpg";

import Jordan1 from "../../public/Jordan/_MG_6692.jpg";
import Jordan2 from "../../public/Jordan/_MG_6711.jpg";
import Jordan3 from "../../public/Jordan/_MG_6994.jpg";
import Jordan4 from "../../public/Jordan/_MG_7025.jpg";
import Jordan5 from "../../public/Jordan/_MG_7042.jpg";
import Jordan6 from "../../public/Jordan/_MG_7082.jpg";
import Jordan7 from "../../public/Jordan/_MG_7159.jpg";


export const all_photos: Types.PhotoList[] = [
  //エジプト
  { id: 1, src: Egypt1, label: "Egypt", alt: "エジプトの写真" },
  { id: 2, src: Egypt2, label: "Egypt", alt: "エジプトの写真" },
  { id: 3, src: Egypt3, label: "Egypt", alt: "エジプトの写真" },
  { id: 4, src: Egypt4, label: "Egypt", alt: "エジプトの写真" },
  { id: 5, src: Egypt5, label: "Egypt", alt: "エジプトの写真" },
  { id: 6, src: Egypt6, label: "Egypt", alt: "エジプトの写真" },
  { id: 7, src: Egypt7, label: "Egypt", alt: "エジプトの写真" },
  //トルコ
  { id: 101, src: Turkey1, label: "Turkey", alt: "トルコの写真" },
  { id: 102, src: Turkey2, label: "Turkey", alt: "トルコの写真" },
  { id: 103, src: Turkey3, label: "Turkey", alt: "トルコの写真" },
  { id: 104, src: Turkey4, label: "Turkey", alt: "トルコの写真" },
  { id: 105, src: Turkey5, label: "Turkey", alt: "トルコの写真" },
  { id: 106, src: Turkey6, label: "Turkey", alt: "トルコの写真" },
  { id: 107, src: Turkey7, label: "Turkey", alt: "トルコの写真" },
  { id: 108, src: Turkey8, label: "Turkey", alt: "トルコの写真" },
  { id: 109, src: Turkey9, label: "Turkey", alt: "トルコの写真" },
  { id: 110, src: Turkey10, label: "Turkey", alt: "トルコの写真" },
  { id: 111, src: Turkey11, label: "Turkey", alt: "トルコの写真" },
  { id: 112, src: Turkey12, label: "Turkey", alt: "トルコの写真" },
  { id: 113, src: Turkey13, label: "Turkey", alt: "トルコの写真" },
  { id: 114, src: Turkey14, label: "Turkey", alt: "トルコの写真" },
  { id: 115, src: Turkey15, label: "Turkey", alt: "トルコの写真" },
  { id: 116, src: Turkey16, label: "Turkey", alt: "トルコの写真" },
  { id: 117, src: Turkey17, label: "Turkey", alt: "トルコの写真" },
  { id: 118, src: Turkey18, label: "Turkey", alt: "トルコの写真" },
  //ヨルダン
  { id: 201, src: Jordan1, label: "Jordan", alt: "ヨルダンの写真" },
  { id: 202, src: Jordan2, label: "Jordan", alt: "ヨルダンの写真" },
  { id: 203, src: Jordan3, label: "Jordan", alt: "ヨルダンの写真" },
  { id: 204, src: Jordan4, label: "Jordan", alt: "ヨルダンの写真" },
  { id: 205, src: Jordan5, label: "Jordan", alt: "ヨルダンの写真" },
  { id: 206, src: Jordan6, label: "Jordan", alt: "ヨルダンの写真" },
  { id: 207, src: Jordan7, label: "Jordan", alt: "ヨルダンの写真" },


]

export const top_view_photos: Types.PhotoList[] = [
  { id: 1, src: Egypt1, label: "Egypt", alt: "エジプトの写真" },
  { id: 206, src: Jordan6, label: "Jordan", alt: "ヨルダンの写真" },
  { id: 102, src: Turkey2, label: "Turkey", alt: "トルコの写真" },
  { id: 103, src: Turkey3, label: "Turkey", alt: "トルコの写真" },
]

export const category: Types.PhotoList[] = [
  { id: 5, src: Egypt5, label: "Egypt", alt: "エジプトの写真" },
  { id: 109, src: Turkey9, label: "Turkey", alt: "トルコの写真" },
  { id: 207, src: Jordan7, label: "Jordan", alt: "ヨルダンの写真" },
]
