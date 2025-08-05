import cron from "node-cron";
import userModel from "../models/user.js";
import axios from "axios";
import addNotification from "../utils/addNotification.js";

cron.schedule("0 9 * * *", async () => {
  const users = await userModel.find().populate({
    path: "books.bookId",
    select: " title",
  });
  const today = new Date();

  for (const user of users) {
    for (const book of user.books) {
      const duedate = new Date(book.dueDate).getTime();
      if (today > duedate) {

        addNotification(user, {
            text: `Reminder: The book "${book.bookId.title}" is overdue. Please return it as soon as possible.`,
            type: "duedate_reminder"
        })

      }
    }
    await user.save();
  }
});
