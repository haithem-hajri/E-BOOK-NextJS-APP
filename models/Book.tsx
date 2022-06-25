// model schema for Contact
import mongoose from "mongoose";
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  book_file: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: [String],
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  since: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Book || mongoose.model("Book", bookSchema);
