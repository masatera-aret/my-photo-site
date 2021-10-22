import * as express from "express"
import * as admin from "firebase-admin"
const serviceAccount = require("../../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()
// const FieldValue = admin.firestore.FieldValue
const router = express.Router()

type news = {
  id: string,
  text: string,
  timestamp: any
}

// type data = {
//   news: string,
//   timestamp: any
// }

router
  .route(`/locations`)
  .get(async (req, res) => {
    try {
      const imagesRef = db.collection(`images`)
      const snapshot = await imagesRef.get()
      let locations: string[] = []
      if (snapshot) {
        snapshot.forEach(doc => {
          locations.push(doc.id)
        })
      }
      res.json({ locations })
    } catch (error) {
      console.log(error);
    }
  })


router
  .route(`/all_images`)
  .get(async (req, res) => {
    try {
      const imagesRef = db.collection(`images`)
      const snapshot = await imagesRef.get()
      let locations: string[] = []
      if (snapshot) {
        snapshot.forEach(doc => {
          locations.push(doc.id)
        })
      }
      // ! reduceを使ってスマートに書きたかったけど、なんかよくわからなエラーが出るからやめる
      let allImages = {}
      await Promise.all(locations.map(async location => {
        const locationRef = db.collection(`images`).doc(location).collection(`photos`)
        const snapshot = await locationRef.get()
        let images: any[] = []
        if (snapshot) {
          snapshot.forEach(doc => {
            images.push({ imageId: doc.id, ...doc.data() })
          })
        }
        allImages = { ...allImages, [location]: images }
      }))
      res.json(allImages)

    } catch (error) {
      console.error(error);
    }
  })


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
      console.error(error)
    }
  })


router
  .route(`/news`)
  .get(async (req, res) => {
    const news: news[] = []
    try {
      const querySnapshot = await db.collection(`news`).orderBy(`timestamp`, `desc`).limit(5).get()
      querySnapshot.forEach(doc => {
        news.push({ id: doc.id, text: doc.data().news, timestamp: doc.data().timestamp })
      })
      res.json(news)
    } catch (error) {
      console.error(error, `@@@@@@@@@@`);
    }
  })

const cors = require('cors')({ origin: true });
router
  .route(`/test`)
  .get(async (req, res) => {
    cors(req, res, async () => {
      try {
        const testRef = db.collection(`test`).doc(`test`)
        await db.runTransaction(async (transaction) => {
          const doc = await transaction.get(testRef)

          const newNumber = (doc.data() && doc.data()!.number || 0) + 1
          transaction.update(testRef, { number: newNumber })
          console.log(`success transaction`)
          res.json({ data: newNumber })
        })
      } catch (error) {
        console.log(error);
      }
    });
  })


module.exports = router