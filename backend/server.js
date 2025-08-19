import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./routes/chat.route.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONOGDB_URI}/RohCortex`)
        console.log(`Database connected ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

await connectDB();

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
