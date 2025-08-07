const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const upload = multer({ dest: "uploads/" });
const app = express();

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("Upload endpoint hit");
  try {
    const docxPath = req.file.path;
    const result = await mammoth.convertToMarkdown({ path: docxPath });
    const markdown = result.value;
    const filename = path.basename(req.file.originalname, ".docx") + ".md";
    const outPath = path.join(__dirname, "src", "devotionals", filename);
    const title = filename.replace(/-/g, " ").replace(".md", "");
    const frontMatter = `---
title: "${title}"
date: ${new Date().toISOString()}
tags:
  - spiritual-growth
layout: default.njk
---
`;

    fs.writeFileSync(outPath, frontMatter + markdown);
    fs.unlinkSync(docxPath); // Clean up uploaded file

    // Trigger Eleventy rebuild and wait for it to finish before responding
    exec("npx eleventy", (error, stdout, stderr) => {
      if (error) {
        console.error(`Eleventy rebuild error: ${error.message}`);
        return res.status(500).send("Error rebuilding Eleventy site.");
      }
      if (stderr) {
        console.error(`Eleventy stderr: ${stderr}`);
      }
      console.log(`Eleventy stdout: ${stdout}`);
      res.send("File uploaded, converted, and Eleventy rebuild triggered!");
    });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.use(express.static("src")); // Serve your Eleventy site

app.listen(3000, () =>
  console.log("Upload server running on http://localhost:3000")
);
