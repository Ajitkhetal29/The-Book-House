import bookModel from "../models/book.js";
import userModel from "../models/user.js";
import addNotification from "../utils/addNotification.js";

const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      language,
      category,
      description,
      totalCopies,
      coverImage,
    } = req.body;

    const users = await userModel.find({ role: "user" });

    const book = new bookModel({
      title,
      author,
      language,
      category,
      description,
      totalCopies,
      availableCopies: totalCopies,
      isAvailable: totalCopies > 0,
      coverImage: coverImage !== "",
      addedBy: req.user.id,
    });

    await book.save();

    users.forEach(async (user) => {
      addNotification(user, {
        text: `New book ${book.title} by ${book.author} is added to library.`,
        type: "book_added",
      });
      await user.save();
    });

    res.status(201).json({ success: true, message: "Book Added", book });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Failed to add book" });
  }
};

const getBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await bookModel.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, message: "book fetched", book });
  } catch (error) {
    console.log(error);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();

    res.status(200).json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch books" });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updateData = { ...req.body };

    const isBorrowed = await userModel.findOne({ "books.bookId": bookId });

    if (isBorrowed && (updateData.title || updateData.author)) {
      return res.status(400).json({
        success: false,
        message: "Cant update. The book is currently burrowed.",
      });
    }

    const updatedBook = await bookModel.findByIdAndUpdate(bookId, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Update book error:", error);
    res.status(500).json({ success: false, message: "Failed to update book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const isBorrowed = await userModel.findOne({ "books.bookId": bookId });

    if (isBorrowed) {
      return res.status(400).json({
        success: true,
        message: "Cant Delete. The book is currently burrowed.",
      });
    }

    const book = await bookModel.findByIdAndDelete(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Book deleted soccessfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete book" });
  }
};

const getAllBurrowedBooks = async (req, res) => {
  try {
    const users = await userModel
      .find({ "books.0": { $exists: true } })
      .populate({
        path: "books.bookId",
        select: "title, author, language, category, coverImage",
      });

    const allBorrowedBooks = [];

    users.forEach((user) => {
      user.books.forEach((book) => {
        allBorrowedBooks.push({
          userName: user.name,
          userEmail: user.email,
          borrowedAt: book.borrowedAt,
          dueDate: book.dueDate,
          title: book.bookId.title,
          author: book.bookId.author,
          language: book.bookId.language,
          category: book.bookId.category,
          coverImage: book.bookId.coverImage,
        });
      });
    });

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      allBorrowedBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: error.message });
  }
};

const getUserBurrowedBooks = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.findById(userId).populate({
      path: "books.bookId",
      select: "_id title author language category coverImage",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userBurrowedBooks = user.books
      .filter((book) => book.bookId)
      .map((book) => ({
        _id: book.bookId._id,
        title: book.bookId.title,
        author: book.bookId.author,
        language: book.bookId.language,
        category: book.bookId.category,
        coverImage: book.bookId.coverImage,
        borrowedAt: book.borrowedAt,
        dueDate: book.dueDate,
      }));

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      userBurrowedBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: error.message });
  }
};

const burrowBook = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;

  try {
    const user = await userModel.findById(userId);
    const book = await bookModel.findById(bookId);

    const alreadyBurrowed = user.books.some(
      (book) => book.bookId.toString() === bookId
    );

    const inWishlist = user.wishlist.some((id) => id.toString() === bookId);

    if (alreadyBurrowed) {
      return res.status(400).json({
        success: false,
        message: "You have alreday burrowed this book",
      });
    }

    if (user.fine > 0) {
      return res.status(400).json({
        success: false,
        message: "Please pay the fine before burrowing book.",
      });
    }

    if (user.books.length >= 2) {
      return res.status(400).json({
        success: false,
        message: "You can only burrow 2 books at a time",
      });
    }

    if (!book.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "The book is not available at the moment",
      });
    }

    if (inWishlist) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    }

    user.books.push({
      bookId: bookId,
      borrowedAt: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    book.availableCopies -= 1;
    book.isAvailable = book.availableCopies > 0;

    await user.save();
    await book.save();

    res.status(200).json({ success: true, message: "Book burrowed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;

    const user = await userModel.findById(userId);
    const book = await bookModel.findById(bookId);

    if (!user) {
      return res.status(400).json({ success: false, message: "No user found" });
    }

    if (!book) {
      return res.status(400).json({ success: false, message: "No book found" });
    }

    const borrowedBook = user.books.find((b) => b.bookId.toString() === bookId);
    if (!borrowedBook) {
      return res
        .status(400)
        .json({ success: false, message: "Book not borrowed by user" });
    }

    user.books = user.books.filter((book) => book.bookId.toString() !== bookId);

    const duedate = new Date(borrowedBook.dueDate);

    const today = new Date();

    if (today > duedate) {
      const diffInTime = today.getTime() - duedate.getTime();
      const overDueDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      const fineAmount = overDueDays * 20;
      user.fine = (user.fine || 0) + fineAmount;

      addNotification(user, {
        text: `You returned book late. fine of Rs ${fineAmount} is applied.`,
        type: "fine",
      });
    }

    book.availableCopies += 1;
    book.isAvailable = true;

    user.history.push({
      bookId: borrowedBook.bookId,
      borrowedAt: borrowedBook.borrowedAt,
      returnedAt: new Date(),
    });

    await user.save();
    await book.save();

    return res.status(200).json({ success: true, message: "book returned" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const bookHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).populate({
      path: "history.bookId",
      select: "_id title author language category coverImage",
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "No user found" });
    }

    const bookHistory = user.history;

    if (!bookHistory) {
      return res
        .status(200)
        .json({ success: true, message: "user has no book history" });
    }

    res
      .status(200)
      .json({ success: true, message: "Book history fetched", bookHistory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getAllBurrowedBooks,
  getUserBurrowedBooks,
  burrowBook,
  returnBook,
  bookHistory,
};
