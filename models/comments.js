const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  belongs_to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'articles'
  },
  created_at: {
    type: Number,
    default: new Date().getTime()
  },
  votes: {
    type: Number,
    default: 0
  },
  created_by: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'users',
    default: 'northcoder'
  }
});

module.exports = mongoose.model('comments', CommentSchema);
