"use strict";
require("dotenv").config();
const { Storage } = require("@google-cloud/storage");

const gcs = new Storage({
    projectId: "koplak-testing-api",
    keyFilename: "./servicekey.json",
});

const bucket = gcs.bucket(process.env.GCP_BUCKET_NAME);

function getPublicUrl(filename) {
    return (
        "https://storage.googleapis.com/" +
        process.env.GCP_BUCKET_NAME +
        "/" +
        filename
    );
}

let imgUpload = {};

imgUpload.uploadtogcs = (req, res, next) => {
    if (!req.file) return next();

    const gcsname = `${req.user}_${Date.now()}`; //name of the file to be uploaded to gcs
    const file = bucket.file(gcsname); //upload the file into gcs
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    stream.on("error", (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on("finish", () => {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });

    stream.end(req.file.buffer);
};

module.exports = imgUpload;
