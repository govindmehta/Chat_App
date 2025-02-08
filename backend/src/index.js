import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser())
app.use(express.json())

dotenv.config();
const PORT = process.env.PORT;

app.use("/api/auth",authRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  }).catch(err => {
    console.error("Database connection failed:", err);
  });