import {
  addBook,
  bookHistory,
  burrowBook,
  deleteBook,
  getAllBooks,
  getAllBurrowedBooks,
  getBook,
  getUserBurrowedBooks,
  returnBook,
  updateBook,
} from "../controller/book.js";
import express from "express";
import { getUser, verifyAdmin, verifyUser } from "../middlewares/user.js";

const bookRouter = express.Router();

bookRouter.post("/addBook", verifyAdmin, addBook);
bookRouter.get("/getbook/:id", getBook);
bookRouter.get("/allBooks", getAllBooks);
bookRouter.post("/updateBook/:id", verifyAdmin, updateBook);
bookRouter.post("/deleteBook/:id", verifyAdmin, deleteBook);
bookRouter.get("/allBurrowedBooks", getAllBurrowedBooks);
bookRouter.get("/userBurrowedBooks", verifyUser, getUserBurrowedBooks);
bookRouter.post("/burrowBook/:id", verifyUser, burrowBook);
bookRouter.post("/returnBook/:id", verifyUser, returnBook);
bookRouter.get("/bookHistory", verifyUser, bookHistory)

export default bookRouter;
