const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/authmiddleware');
const { uploadPDF, getPDFs } = require('../controllers/pdfcontroller');
const { renamePDF, deletePDF } = require('../controllers/pdfcontroller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post('/upload', auth, upload.single('file'), uploadPDF);
router.get('/', auth, getPDFs);

router.delete('/:uuid', auth, deletePDF);
router.put('/:uuid', auth, renamePDF);

module.exports = router;
