const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    filename: String,
    uuid: String,
    originalName: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PDF', pdfSchema);
