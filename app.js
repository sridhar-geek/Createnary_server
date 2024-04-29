import { data } from './aboutData.js'
import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()



app.use('/static', express.static('public'))
app.use(
  cors({
    origin: "https://createnary-client.vercel.app/",
  })
);
app.get('/api/about', (req,res) => {
    res.status(200).json(data)
})
app.get("/api/faq", (req, res) => {
  fs.readFile("faq.json", "utf-8", (err, data) => {
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

const PORT = 4000;
const start =() => {
    app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
}

start()