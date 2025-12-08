// logServer.ts
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// CSV file path (will be created if it doesn't exist)
const LOG_FILE = path.join(__dirname, "headline_logs.csv");

// Ensure CSV header exists
function ensureHeader() {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, "timestamp,headline,label,confidence\n", "utf8");
  }
}

app.post("/log-headline", (req, res) => {
  const { headline, label, confidence } = req.body || {};

  if (!headline || typeof headline !== "string") {
    return res.status(400).json({ error: "headline is required" });
  }

  // Basic sanitization for CSV
  const timestamp = new Date().toISOString();
  const safeHeadline = headline.replace(/"/g, '""'); // escape quotes
  const safeLabel = String(label ?? "").replace(/"/g, '""');
  const safeConfidence = Number(confidence ?? 0);

  ensureHeader();

  const line = `"${timestamp}","${safeHeadline}","${safeLabel}",${safeConfidence}\n`;
  fs.appendFileSync(LOG_FILE, line, "utf8");

  return res.json({ ok: true });
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Headline logger running on http://localhost:${PORT}`);
});