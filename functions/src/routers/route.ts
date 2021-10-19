import * as express from "express"
import * as admin from "firebase-admin"
const serviceAccount = require("../../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue
const router = express.Router()

type news = {
  id: string,
  text: data
}

type data = {
  news: string,
  timestamp: any
}


router
  .route(`/images/:location`)
  .get(async (req, res) => {
    const { location } = req.params
    try {
      const snapshoto = await db.collection(`images`).doc(location).collection(`photos`).orderBy(`createAt`, `desc`).get()
      let images: any[] = []
      snapshoto.forEach(doc => {
        images.push({
          imageId: doc.id,
          ...doc.data()
        })
      })
      res.json({ images: images })
    } catch (error) {
      console.log(error);
    }
  })


router
  .route(`/news`)
  .get(async (req, res) => {
    const news: news[] = []
    try {
      const querySnapshot = await db.collection(`news`).orderBy(`timestamp`, `desc`).limit(5).get()
      querySnapshot.forEach(doc => {
        news.push({ id: doc.id, text: { ...doc.data() as data } })
      })
      res.json({ status: `successful`, news: news })
    } catch (error) {
      console.log(error, `@@@@@@@@@@`);
    }
  })

  .post(async (req, res) => {
    const { news } = req.body
    const timestamp = FieldValue.serverTimestamp()

    try {
      const newNewsRef = await db.collection('news').add({
        news,
        timestamp
      })
      const newsSnapshot = await newNewsRef.get()
      const createdNews = {
        id: newsSnapshot.id,
        ...newsSnapshot.data()
      }
      res.json({ data: createdNews })

    } catch (error) {
      console.log(error, `@@@@@@@@@@@@@@@@@@`);
    }
  })


module.exports = router