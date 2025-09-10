const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const { addHighlight, getHighlights } = require('../controllers/highlightcontroller');

router.post('/', auth, addHighlight);
router.get('/:pdfUuid', auth, getHighlights);

module.exports = router;
