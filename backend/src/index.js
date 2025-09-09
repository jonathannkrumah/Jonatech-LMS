import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import materialRoutes from "./routes/materials.js";

const app = express();   // ✅ create app first

app.use(cors());
app.use(bodyParser.json());

app.use("/materials", materialRoutes); // ✅ now attach routes

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
