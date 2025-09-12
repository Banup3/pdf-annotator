// const mongoose = require('mongoose');

// const highlightSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     pdfUuid: String,
//     page: Number,
//     text: String,
//     position: Object,
//     timestamp: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Highlight', highlightSchema);

const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uuid: { type: String, required: true },
  page: { type: Number, required: true },
  text: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Highlight', highlightSchema);
