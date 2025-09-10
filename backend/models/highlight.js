const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pdfUuid: String,
    page: Number,
    text: String,
    position: Object,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Highlight', highlightSchema);
