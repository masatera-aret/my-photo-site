import * as functions from "firebase-functions";
import * as express from "express"
import * as router from "./routers/route"
import * as admin from "firebase-admin"

const db = admin.firestore()
const app = express()
// @ts-ignore
app.use(`/`, router)
const FieldValue = admin.firestore.FieldValue


// export const api = functions.region(`asia-northeast1`).https.onRequest(app)

export const addImageUrl = functions.region(`asia-northeast1`).storage.object().onFinalize(async (obj) => {
  const root = obj.name as string
  const rootChunk = root.split(`/`)
  const topCollection = rootChunk[0]
  const photoLabel = rootChunk[1]
  const fileName = rootChunk[2]

  try {
    if (obj.contentType?.match(/application\/x-www-form-urlencoded/)) {
      if (topCollection !== `images`) throw new Error(`imagesじゃないところに入れてるよ`)
      await db.collection(topCollection).doc(photoLabel).set({
        id: 0
      })
    }
  } catch (error) {
    console.log(`フォルダ追加のエラー`, error);
  }

  try {
    if (!obj.contentType?.match(/image\//)) return
    if (topCollection !== `images`) throw new Error(`imagesじゃないところに入れてるよ`)
    const fileRoot = root.replace(/\//g, `%2F`)

    // 最後尾のidを一度取得
    const photoLabelDocRef = db.collection(topCollection).doc(photoLabel)

    // 最後尾のidに + 1 する
    await photoLabelDocRef.update({
      id: FieldValue.increment(1)
    })

    const doc = await photoLabelDocRef.get()
    const id = doc.data()!.id

    const chunkFileName = fileName.split(`.`)
    const fileNameWithoutExt = chunkFileName[0]
    await db.collection(topCollection).doc(photoLabel).collection(`photos`).doc(`${photoLabel}_${fileNameWithoutExt}`).set({
      id: id,
      filename: fileNameWithoutExt,
      url: `https://firebasestorage.googleapis.com/v0/b/${obj.bucket}/o/${fileRoot}?alt=media`,
      label: photoLabel,
      createAt: FieldValue.serverTimestamp()
    })
  } catch (error) {
    console.log(`imageのurl登録でエラー`, error);
  }
})

export const deleteImageUrl = functions.region(`asia-northeast1`).storage.object().onDelete(async (obj) => {
  if (!obj.contentType?.match(/image\//)) return
  try {
    const filePath = obj.name
    const chunkFilePath = filePath!.split(`/`)
    const topCollection = chunkFilePath[0]
    const photoLabel = chunkFilePath[1]
    const fileName = chunkFilePath[2]
    const chunkFileName = fileName.split(`.`)
    const fileNameWithoutExt = chunkFileName[0]
    if (topCollection !== `images`) return

    await db.collection(topCollection).doc(photoLabel).collection(`photos`).doc(`${photoLabel}_${fileNameWithoutExt}`).delete();
  } catch (error) {
    console.log('deleteImageUrlのエラー', error);
  }
})