const express = require('express');
const router = express.Router();
const PDF = require('../models/PDF'); // Your PDF model
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const pdfs = await PDF.find({ user: req.user.id });
    res.json(pdfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/:uuid', auth, async (req, res) => {
  try {
    const { uuid } = req.params;
    const pdf = await PDF.findOneAndDelete({ uuid, user: req.user.id });
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });

    // Optionally, remove the file from your uploads folder here

    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.put('/:uuid', auth, async (req, res) => {
  try {
    const { newName } = req.body;
    const { uuid } = req.params;

    const pdf = await PDF.findOne({ uuid, user: req.user.id });
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });

    pdf.originalName = newName;
    await pdf.save();

    res.json(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
