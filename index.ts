import express from "express";
const app = express();
const port = 3000;

const express_middleware = express.json();

const db = {
  courses: [
    { id: 1, title: "frontend" },
    { id: 2, title: "backend" },
    { id: 3, title: "qa" },
    { id: 4, title: "hr" },
  ],
};

const http_statuses = {
  // 200
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  // 400
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

app.use(express_middleware);

app.get("/courses", (req, res) => {
  let foundedCourses = db.courses;
  if (req.query.title) {
    foundedCourses = foundedCourses.filter(
      (course) => course.title.indexOf(req.query.title as string) !== -1
    );
  }
  if (!foundedCourses.length) {
    res.sendStatus(http_statuses.NOT_FOUND);
    return;
  } else {
    res.json(foundedCourses);
  }
});

app.get("/courses/:id", (req, res) => {
  const findedCourse = db.courses.find((item) => item.id === +req.params.id);
  if (!findedCourse) {
    res.sendStatus(http_statuses.NOT_FOUND);
    return;
  } else {
    res.json(findedCourse);
    return;
  }
});

app.put("/courses/:id", (req, res) => {
  const findedCourse = db.courses.find((item) => item.id === +req.params.id);
  if (!findedCourse) {
    res.sendStatus(http_statuses.NOT_FOUND);
    return;
  } else {
    findedCourse.title = req.body.title;
    res.json(findedCourse);
    return;
  }
});

app.post("/courses", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(http_statuses.BAD_REQUEST);
    return;
  }
  const createdCourse = {
    id: +new Date(),
    title: req.body.title,
  };
  db.courses.push(createdCourse);
  res.status(http_statuses.CREATED).json(createdCourse);
  return;
});

app.delete("/courses/:id", (req, res) => {
  if (db.courses.find((item) => item.id === +req.params.id)) {
    db.courses.filter((item) => item.id !== +req.params.id);
    res.sendStatus(http_statuses.NO_CONTENT);
    return;
  } else {
    res.sendStatus(http_statuses.NOT_FOUND);
    return;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
