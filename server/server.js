import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.js";
import bookRouter from "./routes/book.js";
import bookModel from "./models/book.js";
import "./cron/quoteCron.js"
import "./cron/fine_reminder.js"
import "./cron/dueDate.js"

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/',(req, res)=>{
  res.send("Hello from The Book House ")
})

app.use("/api/user/", userRouter);
app.use("/api/book/", bookRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running on a port 3000");
});


