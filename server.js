require("dotenv").config();
const express = require("express");
const pool = require("./database/conn.js");
const cors = require("cors");
// const database = require("./database/conn.js");
const app = express();

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/crankdatsteps", async (req, res) => {
  try {
    pool.connect();
    const data = await pool.query("SELECT * FROM dancesteps;");
    res.json(data.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/crankdatsteps/:id", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM dancesteps WHERE id=$1;", [
      parseInt(req.params.id),
    ]);
    res.json(data.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/crankdatsteps", async (req, res) => {
  try {
    const data = await pool.query("INSERT INTO dancesteps(steps) VALUES($1)", [
      req.body.steps,
    ]);
    res.send(req.body);
  } catch (err) {
    console.error(err);
  }
});

app.patch("/api/crankdatsteps/:id", async (req, res) => {
  try {
    const { steps } = req.body;
    console.log(req.params);
    const data = await pool.query(`SELECT * FROM dancesteps WHERE id = $1`, [
      parseInt(req.params.id),
    ]);
    const updateDB = {
      steps: steps || data.rows[0].steps,
    };
    const updatecrankdatsteps = await pool.query(
      `UPDATE dancesteps SET steps = $1 WHERE id = $2 RETURNING *`,
      [updateDB.steps, req.params.id]
    );
    res.json(updatecrankdatsteps.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/api/crankdatsteps/:id", async (req, res) => {
  try {
    await pool.connect();
    const data = await pool.query("DELETE FROM dancesteps WHERE id = $1;", [
      req.params.id,
    ]);
    res.json(data.rows);
  } catch (err) {}
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
