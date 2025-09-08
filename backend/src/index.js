import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
