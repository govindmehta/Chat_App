import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,                 
}));
app.use(cookieParser())
app.use(express.json())

dotenv.config();
const PORT = process.env.PORT;

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  }).catch(err => {
    console.error("Database connection failed:", err);
  });