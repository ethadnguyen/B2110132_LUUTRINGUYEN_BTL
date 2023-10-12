const aws = require("aws-sdk"),
    {
        S3
    } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'amazon-node',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;