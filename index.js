import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userController from './controllers/user.js'

dotenv.config();
const PORT = process.env.APP_PORT || 3000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "App up & Running" });
});

const router = express.Router();

router.use(userController);

const server = app.listen(PORT, () => {
    const host = server.address().address === "::" ? "localhost" : server.address().address;
    console.log(`Server is running on: http://${host}:${PORT}`);
});