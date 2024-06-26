import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./rotes/user.js";
import videoRouts from "./rotes/video.js";
import commentsRouts from "./rotes/comments.js";
import subscribeRouts from "./rotes/subscribe.js";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";


if (process.env.NODE_ENV != "production") {
    dotenv.config();
}

const port = process.env.PORT || 4000;;
const DB_URL = process.env.CONNECTION_URL;
const io = new Server(8000 , {
    cors: true,
});
  
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit:"30mb",extended: true}));
app.use(express.urlencoded({limit:"30mb",extended: true}));
app.use("/uploads",express.static(path.join("uploads")));


// main().then(() => {
//     console.log("Connection Successful..");
// })
//     .catch(err => console.log(err))

// async function main() {
//     await mongoose.connect(DB_URL);
// }

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("Connection Successful..");
    })
    .catch((err) => console.log(err));

app.get("/",(req,res)=>{
    res.send("Hellow");
})
app.use("/user",userRoutes);
app.use("/video",videoRouts);
app.use("/comment",commentsRouts);
app.use("/subscribe",subscribeRouts);

app.listen(port,() => {
    console.log(`Server Running on the Port: ${port}`)
})

