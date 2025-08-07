const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });
const app = express();

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const docxPath = req.file.path;
    const result = await mammoth.convertToMarkdown({ path: docxPath });
    const markdown = result.value;
    const filename = path.basename(req.file.originalname, ".docx") + ".md";
    const outPath = path.join(__dirname, "src", "devotionals", filename);
    fs.writeFileSync(outPath, markdown);
    fs.unlinkSync(docxPath); // Clean up uploaded file
    res.send("File uploaded and converted!");
    // Optionally, trigger Eleventy rebuild here (e.g., with a child_process)
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.use(express.static("src")); // Serve your Eleventy site

app.listen(3000, () =>
  console.log("Upload server running on http://localhost:3000")
);
