import { data } from "./aboutData.js";
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(express.json());
app.use("/static", express.static("public"));
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://createnary-client.vercel.app",
  })
);
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Server</h1>");
});

app.get("/api/about", (req, res) => {
  res.status(200).json(data);
});
app.get("/api/faq", (req, res) => {
  fs.readFile("Faq.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading FAQ file:", err);
      return res
        .status(500)
        .send("An error occurred while processing your request.");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  });
});

app.post("/api/calculate", (req, res) => {
  const { followers, products } = req.body;
  let followersIncome = followers / 10;
  let productsIncome = Math.floor(products / 2);
  const totalIncome = (followersIncome + productsIncome) * 1000;
  res.status(200).json(totalIncome);
});

const PORT = 4000;
const start = () => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

start();
