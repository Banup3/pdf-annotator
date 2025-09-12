const PDF = require('../models/pdf');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const uploadPDF = async (req, res) => {
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

const getPDFs = async (req, res) => {
    const pdfs = await PDF.find({ user: req.user.id });
    res.json(pdfs);
};

const deletePDF = async (req, res) => {
    try {
        const { uuid } = req.params;
        const pdf = await PDF.findOneAndDelete({ uuid, user: req.user.id });
        if (!pdf) return res.status(404).json({ message: 'PDF not found' });

        // Optionally: remove the file from the uploads folder here

        res.json({ message: 'PDF deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const renamePDF = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { newName } = req.body;
        const pdf = await PDF.findOne({ uuid, user: req.user.id });
        if (!pdf) return res.status(404).json({ message: 'PDF not found' });

        pdf.originalName = newName;
        await pdf.save();

        res.json(pdf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    uploadPDF,
    getPDFs,
    deletePDF,
    renamePDF
};