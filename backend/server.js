const path = require("path");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost") && !process.env.DATABASE_URL.includes("127.0.0.1")
    ? { rejectUnauthorized: false }
    : false
});
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email.toLowerCase()]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const createResult = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email.toLowerCase(), passwordHash]
    );

    const user = createResult.rows[0];
    await pool.query("INSERT INTO user_progress (user_id, progress) VALUES ($1, $2)", [user.id, {}]);

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "30d" });
    res.json({ token, email: user.email });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create account." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const result = await pool.query("SELECT id, email, password_hash FROM users WHERE email = $1", [email.toLowerCase()]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "30d" });
    res.json({ token, email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to authenticate." });
  }
});

app.get("/api/progress", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT progress FROM user_progress WHERE user_id = $1", [req.user.userId]);
    if (result.rows.length === 0) {
      return res.json({});
    }

    res.json(result.rows[0].progress || {});
  } catch (error) {
    console.error("Fetch progress error:", error);
    res.status(500).json({ error: "Failed to load progress." });
  }
});

app.post("/api/progress", authMiddleware, async (req, res) => {
  const progress = req.body;
  try {
    await pool.query(
      `INSERT INTO user_progress (user_id, progress)
       VALUES ($1, $2)
       ON CONFLICT (user_id) DO UPDATE
       SET progress = EXCLUDED.progress,
           updated_at = now()`,
      [req.user.userId, progress]
    );
    res.json({ ok: true });
  } catch (error) {
    console.error("Save progress error:", error);
    res.status(500).json({ error: "Failed to save progress." });
  }
});

app.get("/api/me", authMiddleware, async (req, res) => {
  res.json({ email: req.user.email, userId: req.user.userId });
});

// Serve static files from the React frontend build directory
app.use(express.static(path.join(__dirname, "../dist")));

// Any other routes should serve index.html (client-side routing)
app.get("*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
