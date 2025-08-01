import { text } from "express";

const addNotification = (user, { text, type }) => {
  user.notifications.push({ text, type });

  if (user.notifications.length > 50) {
      user.notifications = user.notifications.filter(
        (n) => n.type === "fine" || n.type === "payment"
      );
  }
};

export default addNotification;
