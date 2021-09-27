import * as Photos from "@/assets/ts/images";

export default function handler({ query: { label } }, res) {
  const filterd_photos = Photos.all_photos.filter(photo => photo.label.toLocaleLowerCase() === label)
  res.status(200).json(filterd_photos)
}