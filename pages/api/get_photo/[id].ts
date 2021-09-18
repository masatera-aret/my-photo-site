import * as Photos from "../../../assets/ts/images";


export default function handler({ query: { id } }, res) {
  const getPhoto = Photos.all_photos.find(el => el.id === Number(id))
  res.status(200).json(getPhoto)
}