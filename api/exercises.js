const express = require("express");
const exercisesRouter = express.Router();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database.sqlite");

exercisesRouter.param("exerciseName", (req, res, next, exerciseName) => {
  const sql = `SELECT * FROM Exercise WHERE name LIKE '%${exerciseName}%'`;
  db.get(sql, (err, row) => {
    if (err) {
      next(err);
    } else if (row) {
      req.exercise = row;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// Route for getting list of all exercise names

exercisesRouter.get("/", (req, res, next) => {
  const sql = `SELECT * FROM Exercise`;
  db.all(sql, (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ exercises: rows });
    }
  });
});

// Route for adding an exercise

exercisesRouter.post("/", (req, res, next) => {
  const name = req.body.exercise.name;
  const muscles = req.body.exercise.muscles;
  const description = req.body.exercise.description;
  const level = req.body.exercise.level;
  const video = req.body.exercise.video;
  const sql = `INSERT INTO Exercise
              (name, muscles, description, level, video_link)
              VALUES($name, $muscles, $description, $level, $video)`;
  const values = {
    $name: name,
    $muscles: muscles,
    $description: description,
    $level: level,
    $video: video,
  };
  if (!name || !muscles || !description || !level || !video) {
    res.sendStatus(400);
  } else {
    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(
          `SELECT * FROM Exercise where id = ${this.lastID}`,
          (err, row) => {
            if (err) {
              next(err);
            } else {
              res.status(200).send({ exercise: row });
            }
          }
        );
      }
    });
  }
});

// Route for updating an existing exercise

exercisesRouter.put("/:exerciseId", (req, res, next) => {
  const name = req.body.exercise.name;
  const muscles = req.body.exercise.muscles;
  const description = req.body.exercise.description;
  const level = req.body.exercise.level;
  const video = req.body.exercise.video;
  const id = req.params.exerciseId;
  const sql = `UPDATE EXERCISE
              SET name = $name,
              muscles = $muscles,
              description = $description,
              level = $level,
              video_link = $video
              WHERE id = $id;`;
  const values = {
    $name: name,
    $muscles: muscles,
    $description: description,
    $level: level,
    $video: video,
    $id: id,
  };
  if (!name || !muscles || !description || !level || !video) {
    res.sendStatus(400);
  } else {
    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Exercise where id = ${id}`, (err, row) => {
          if (err) {
            next(err);
          } else {
            res.status(200).send({ exercise: row });
          }
        });
      }
    });
  }
});

// Route for returning search by body part

exercisesRouter.get("/bodypart", (req, res, next) => {
  const musclesStringSplit = req.query.muscles.split("_");
  const musclesWithCommas = musclesStringSplit.join(`","`);
  const levelStringSplit = req.query.level.split("");
  const levelWithCommas = levelStringSplit.join(",");
  const sql = `SELECT * FROM Exercise WHERE muscles IN ("${musclesWithCommas}") AND level IN (${levelWithCommas})`;
  db.all(sql, (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ exercises: rows });
    }
  });
});

// Route for returning search by Name

exercisesRouter.get("/:exerciseName", (req, res, next) => {
  const name = req.params.exerciseName;

  const levelStringSplit = req.query.level.split("");
  const levelWithCommas = levelStringSplit.join(",");
  const sql = `SELECT * FROM Exercise WHERE name LIKE '%${name}%' AND level IN (${levelWithCommas})`;
  db.all(sql, (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ exercises: rows });
    }
  });
});

module.exports = exercisesRouter;
