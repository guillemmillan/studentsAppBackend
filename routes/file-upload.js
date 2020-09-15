const express = require('express');
const router  = express.Router();

// include CLOUDINARY:
const uploadCloud = require('../configs/cloudinary-setup');
const jobModel = require('../models/job')

router.post('/upload', uploadCloud.single("imageUrl"), (req, res, next) => {
     console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    
    res.json({path: req.file.path})
})

module.exports = router;
