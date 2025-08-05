import Stripe from "stripe";
import userModel from "../models/user.js";
import addNotification from "../utils/addNotification.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeFineSession = async (req, res) => {
  try {
    const { userId, fine } = req.body;
    const { origin } = req.headers;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    if (fine <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fine to pay" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Library Fine Payment",
            },
            unit_amount: user.fine * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      success_url: `${origin}/verify?success=true&userId=${user._id}`,
      cancel_url: `${origin}/verify?success=false&userId=${user._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    user.fine = 0;
    await addNotification(user, {
      text: "Fine payment Successful. Thank you",
      type: "payment",
    });

    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
