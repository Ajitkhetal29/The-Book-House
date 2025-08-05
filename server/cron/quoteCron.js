import cron from "node-cron";
import userModel from "../models/user.js";
import addNotification from "../utils/addNotification.js";
import axios from 'axios';

cron.schedule("0 8 * * *", async () => {

    const users = await userModel.find({role : "user"});

    const {data} = await axios.get("https://zenquotes.io/api/random");

    const quote = data[0].q;

    for (const user of users) {
        addNotification(user, {
            text : `Good Morning, ${quote}`,
            type : "quote"
        })
        await user.save();
    }
    

})
