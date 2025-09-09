import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/:id/view", (req, res) => {
  const { id } = req.params;

  // map course material IDs to filenames (later this will come from DB)
  const fileMap = {
    "1": "Jonathan Nkrumah.pdf",
    "2": "week2.pdf"
  };

  const filename = fileMap[id];
  if (!filename) return res.status(404).send("Material not found");

  const filePath = path.join("src/uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found on server");
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline");
  fs.createReadStream(filePath).pipe(res);
});

export default router;
