const Highlight = require('../models/highlight');

exports.addHighlight = async (req, res) => {
    const { pdfUuid, page, text, position } = req.body;
    const highlight = new Highlight({
        user: req.user.id,
        pdfUuid,
        page,
        text,
        position,
    });
    await highlight.save();
    res.json({ message: 'Highlight added', highlight });
};

exports.getHighlights = async (req, res) => {
    const { pdfUuid } = req.params;
    const highlights = await Highlight.find({ user: req.user.id, pdfUuid });
    res.json(highlights);
};
