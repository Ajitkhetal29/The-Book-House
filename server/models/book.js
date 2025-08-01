import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  language: {
    type: String,
    required: true,
    enum: ["Marathi", "Hindi", "English"],
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Fiction",
      "Non-fiction",
      "Science",
      "Biography",
      "Technology",
      "Other",
    ],
  },
  description: { type: String },
  totalCopies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
  coverImage: { type: String, default:"https://covers.openlibrary.org/b/id/8236450-L.jpg" },
  isAvailable: { type: Boolean, default: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},{timestamps : true});

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel;
