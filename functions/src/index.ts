import * as functions from "firebase-functions";
import * as express from "express"
import * as router from "./routers/route"
import * as admin from "firebase-admin"

const db = admin.firestore()
const app = express()
// @ts-ignore
app.use(`/`, router)
const FieldValue = admin.firestore.FieldValue


export const api = functions.region(`asia-northeast1`).https.onRequest(app)

export const addImageUrl = functions.region(`asia-northeast1`).storage.object().onFinalize(async (obj) => {
  const root = obj.name as string
  const rootChunk = root.split(`/`)
  const topCollection = rootChunk[0]
  const photoLabel = rootChunk[1]
  const fileName = rootChunk[2]

  // imagesコレクションにフォルダを追加した場合の処理
  try {
    if (obj.contentType?.match(/application\/x-www-form-urlencoded/)) {
      if (topCollection !== `images`) throw new Error(`imagesじゃないところに入れてるよ`)
      await db.collection(topCollection).doc(photoLabel).set({
        id: 0
      })
      functions.logger.log(`フォルダの追加完了`, root)
    }
  } catch (error) {
    functions.logger.log(error)
  }

  // imagesコレクション内にimage/jpegを追加した場合の処理
  try {
    if (!obj.contentType?.match(/image\//)) return
    if (topCollection !== `images`) throw new Error(`imagesじゃないところに入れてるよ`)
    const fileRoot = root.replace(/\//g, `%2F`)

    // transactionでidをuniqueな値(連番の数字)にする
    const photoLabelDocRef = db.collection(topCollection).doc(photoLabel)
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(photoLabelDocRef)

      const newId: number = (doc.data() && doc.data()!.id || 0) + 1
      transaction.update(photoLabelDocRef, { id: newId })

      const chunkFileName = fileName.split(`.`)
      const fileNameWithoutExt = chunkFileName[0]
      await db.collection(topCollection).doc(photoLabel).collection(`photos`).doc(`${photoLabel}_${fileNameWithoutExt}`).set({
        id: newId,
        filename: fileNameWithoutExt,
        url: `https://firebasestorage.googleapis.com/v0/b/${obj.bucket}/o/${fileRoot}?alt=media`,
        label: photoLabel,
        createAt: FieldValue.serverTimestamp()
      })
    })
    functions.logger.log(`${photoLabel}フォルダへ${fileName}の追加が完了`)
  } catch (error) {
    functions.logger.log(`imageの追加が出来ませんでした`, error)
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
    functions.logger.log('deleteImageUrlのエラー', error);
  }
})