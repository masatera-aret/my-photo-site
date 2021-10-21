"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageUrl = exports.addImageUrl = exports.api = void 0;
const functions = require("firebase-functions");
const express = require("express");
const router = require("./routers/route");
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();
// @ts-ignore
app.use(`/`, router);
const FieldValue = admin.firestore.FieldValue;
exports.api = functions.region(`asia-northeast1`).https.onRequest(app);
exports.addImageUrl = functions.region(`asia-northeast1`).storage.object().onFinalize(async (obj) => {
    var _a, _b;
    const root = obj.name;
    const rootChunk = root.split(`/`);
    const topCollection = rootChunk[0];
    const photoLabel = rootChunk[1];
    const fileName = rootChunk[2];
    try {
        if ((_a = obj.contentType) === null || _a === void 0 ? void 0 : _a.match(/application\/x-www-form-urlencoded/)) {
            if (topCollection !== `images`)
                throw new Error(`imagesじゃないところに入れてるよ`);
            await db.collection(topCollection).doc(photoLabel).set({
                id: 0
            });
            functions.logger.log(`フォルダの追加完了`, root);
        }
    }
    catch (error) {
        functions.logger.log(error);
    }
    try {
        if (!((_b = obj.contentType) === null || _b === void 0 ? void 0 : _b.match(/image\//)))
            return;
        if (topCollection !== `images`)
            throw new Error(`imagesじゃないところに入れてるよ`);
        const fileRoot = root.replace(/\//g, `%2F`);
        // 最後尾のidを一度取得
        const photoLabelDocRef = db.collection(topCollection).doc(photoLabel);
        // 最後尾のidに + 1 する
        await photoLabelDocRef.update({
            id: FieldValue.increment(1)
        });
        const doc = await photoLabelDocRef.get();
        const id = doc.data().id;
        const chunkFileName = fileName.split(`.`);
        const fileNameWithoutExt = chunkFileName[0];
        await db.collection(topCollection).doc(photoLabel).collection(`photos`).doc(`${photoLabel}_${fileNameWithoutExt}`).set({
            id: id,
            filename: fileNameWithoutExt,
            url: `https://firebasestorage.googleapis.com/v0/b/${obj.bucket}/o/${fileRoot}?alt=media`,
            label: photoLabel,
            createAt: FieldValue.serverTimestamp()
        });
        functions.logger.log(`${photoLabel}フォルダへ${fileName}の追加が完了`);
    }
    catch (error) {
        functions.logger.log(`imageの追加が出来ませんでした`, error);
    }
});
exports.deleteImageUrl = functions.region(`asia-northeast1`).storage.object().onDelete(async (obj) => {
    var _a;
    if (!((_a = obj.contentType) === null || _a === void 0 ? void 0 : _a.match(/image\//)))
        return;
    try {
        const filePath = obj.name;
        const chunkFilePath = filePath.split(`/`);
        const topCollection = chunkFilePath[0];
        const photoLabel = chunkFilePath[1];
        const fileName = chunkFilePath[2];
        const chunkFileName = fileName.split(`.`);
        const fileNameWithoutExt = chunkFileName[0];
        if (topCollection !== `images`)
            return;
        await db.collection(topCollection).doc(photoLabel).collection(`photos`).doc(`${photoLabel}_${fileNameWithoutExt}`).delete();
    }
    catch (error) {
        functions.logger.log('deleteImageUrlのエラー', error);
    }
});
//# sourceMappingURL=index.js.map