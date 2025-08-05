import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import bookModel from "../models/book.js";
import addNotification from "../utils/addNotification.js";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET);
  {
    expiresIn: "1d";
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    addNotification(user, {
      text: `Welcome to the The Book House, ${user.name}!`,
      type: "signin",
    });
    await user.save();
    const token = createToken(user._id, user.role);
    res.status(201).json({
      success: true,
      message: "Registeration Succesfull",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Inavlid Password" });
    }

    const token = createToken(user._id, user.role);
    res
      .status(201)
      .json({ success: true, message: "Login Successfull", token, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ success: true, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const addToWishList = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;

    const user = await userModel.findById(userId);
    const book = await bookModel.findById(bookId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (!book) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found" });
    }

    const alreadyAdded = user.wishlist.some(
      (item) => item.toString() === bookId
    );

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Book is already in the wishlist",
      });
    }

    user.wishlist.push(bookId);
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Book added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).populate({
      path: "wishlist",
      select: "_id title author coverImage language category isAvailable",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userWishlist = user.wishlist;

    res.status(200).json({
      success: true,
      message: "user wishlist fetched successfully",
      userWishlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;

    const user = await userModel.findById(userId);
    const book = await bookModel.findById(bookId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Book removed from wishlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: error.message });
  }
};

const getBurrowedBook = async (req, res) => {
  try {
    const users = await userModel
      .find({ "books.0": { $exists: true } })
      .select("name email books")
      .populate({
        path: "books.bookId",
        select: "_id title author coverImage",
      });

    const burrowedBooks = [];

    users.forEach((user) => {
      user.books.forEach((entry) =>
        burrowedBooks.push({
          userName: user.name,
          userEmail: user.email,
          title: entry.bookId.title,
          author: entry.bookId.author,
          coverImage: entry.bookId.coverImage,
          borrowedAt: entry.borrowedAt,
          dueDate: entry.dueDate,
          isOverdue: new Date(entry.dueDate < new Date()),
        })
      );
    });

    res.status(200).json({ success: true, burrowedBooks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find().populate({
      path: "books.bookId",
      select: "_id title author coverImage",
    });

    const users = allUsers.filter((user) => user.role !== "admin");

    res
      .status(200)
      .json({ success: true, message: "All users fetched", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (user.books.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You have burrowed the books.",
      });
    }

    if (user.fine > 0) {
      return res.status(400).json({
        success: false,
        message: "You have pending fine to pay.",
      });
    }

    await userModel.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "Profile Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNotifications = async (req, res) => {
  
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    const notifications = user.notifications.reverse();
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  register,
  login,
  getUserDetails,
  addToWishList,
  getUserWishlist,
  removeFromWishlist,
  getBurrowedBook,
  getAllUsers,
  deleteUser,
  getNotifications
};
