import cron from "node-cron";
import userModel from "../models/user.js";
import addNotification from "../utils/addNotification.js";

cron.schedule("0 9 * * *", async () => {
  const users = await userModel.find({ fine: { $gt: 0 } });

  for (const user of users) {
    const now = new Date();
    const lastReminder = user.notifications
      .filter((n) => n.type === "fine_reminder")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    const diffInDays = Math.floor(
      ((now - lastReminder) / 1000) * 60 * 60 * 24
    );

    if (diffInDays >= 3) {
      addNotification(user, {
        text: `Reminder: You have a pending fine of Rs ${user.fine}. Please pay it as soon as possible.`,
        type: "fine_reminder",
      });
    }

    await user.save();
  }
});
