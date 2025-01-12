const express = require('express')
const multer = require('multer')
const uploadController = require('../controllers/uploadController');


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-23andme', upload.single('genomeFile'), uploadController.handleUpload);

module.exports = router;