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
  .route(`/test`)
  .get((req, res) => {
    res.send(`received req by GET`)
  })
  .post((req, res) => {
    res.send(`received request by POST`)
  })


router
  .route(`/test/:id`)
  .get((req, res) => {
    res.send(`GET ${req.params.id}`)
  })

router
  .route(`/news`)
  .get(async (req, res) => {
    const news: news[] = []
    try {
      const querySnapshot = await db.collection(`news`).orderBy(`timestamp`, `desc`).get()
      querySnapshot.forEach(doc => {
        news.push({ id: doc.id, text: { ...doc.data() as data } })
      })
    } catch (error) {
      console.log(error, `@@@@@@@@@@`);
    }
    res.json({ status: `successful`, news: news })
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