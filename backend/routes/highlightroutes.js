// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/authmiddleware');
// const { addHighlight, getHighlights } = require('../controllers/highlightcontroller');

// router.post('/', auth, addHighlight);
// router.get('/:pdfUuid', auth, getHighlights);

// module.exports = router;
const express = require('express');
const router = express.Router();
const Highlight = require('../models/highlight');
const auth = require('../middleware/authmiddleware'); // JWT verification middleware

// Save a new highlight
router.post('/', auth, async (req, res) => {
  try {
    const { uuid, page, text, x, y, width, height, timestamp } = req.body;
    const highlight = new Highlight({
      user: req.user.id, // from JWT
      uuid,
      page,
      text,
      x,
      y,
      width,
      height,
      timestamp
    });

    await highlight.save();
    res.status(201).json(highlight);
  } catch (error) {
    console.error('Error saving highlight:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get highlights for a specific PDF (by uuid)
router.get('/:uuid', auth, async (req, res) => {
  try {
    const { uuid } = req.params;
    const highlights = await Highlight.find({ user: req.user.id, uuid });
    res.json(highlights);
  } catch (error) {
    console.error('Error fetching highlights:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
