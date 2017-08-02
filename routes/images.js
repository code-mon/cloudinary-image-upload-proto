const express = require('express');
const router = require('express').Router();
const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');

// tells multer how to store images
const storage = multer.diskStorage({
  destination: './public/images', // this is where we want to save images
  filename: (req, file, cb) => {
    // the callback function returns the file name which is
    // currently just the current date plus the original
    // extension. Multer doesn't set extensions!
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// make an upload function to use in the route
const upload = multer({ storage: storage });

router.get('/', function(req, res) {
  res.send('ok');
});

// upload.single says only accept a single file that is on the request
// object under the key value 'image'
router.post('/', upload.single('image'), function(req, res) {
  console.log(req.file);

  // upload the file to cloudinary. The callback receives a result
  // object which has the URL where the image is now available.
  cloudinary.uploader.upload(req.file.path, result => {
    console.log(result);
  });
  res.send('ok');
});

module.exports = router;
