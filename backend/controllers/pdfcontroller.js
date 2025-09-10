const PDF = require('../models/pdf');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

exports.uploadPDF = async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const pdf = new PDF({
        user: req.user.id,
        filename: file.filename,
        uuid: uuidv4(),
        originalName: file.originalname,
    });

    await pdf.save();
    res.json({ message: 'PDF uploaded', pdf });
};

exports.getPDFs = async (req, res) => {
    const pdfs = await PDF.find({ user: req.user.id });
    res.json(pdfs);
};
