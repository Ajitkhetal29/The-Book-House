import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    fine: { type: Number, default: 0 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    books: [
      {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        borrowedAt: { type: Date, default: Date.now },
        dueDate: { type: Date },
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    history: [
      {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        borrowedAt: { type: Date },
        returnedAt: { type: Date, default: Date.now }
      },
    ],
    notifications : [
      {
        text : {type : String, required : true},
        type : {
          type : String,
          enum : ["signin", "book_added", "fine", "payment", "quote", "fine_reminder", "duedate_reminder"],
          required : true
        },
        createdAt: { type: Date, default: Date.now }
      }
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
