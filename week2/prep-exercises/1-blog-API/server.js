const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/blogs", (req, res) => {
  res.send("Hello World");
});
app.post("/blogs", (req, res) => {
  const title = req.body.title;
  const findFile = fs.existsSync(title);
  if (!findFile) {
    const content = req.body.content;
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    res.send("This post is already exist");
  }
});

app.put("/:title", (req, res) => {
  const title = req.params.title;
  const content = req.body.content;
  const findFile = fs.existsSync(title);
  if (findFile) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    // Send response with error message
    res.send("This post does not exist!");
  }
});
app.delete("/:title", (req, res) => {
  const title = req.params.title;
  const findFile = fs.existsSync(title);
  if (findFile) {
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    res.send("This post does not exist!");
  }
});
app.get("/:title", (req, res) => {
  const title = req.params.title;
  const findFile = fs.existsSync(title);
  if (findFile) {
    const post = fs.readFileSync(title);
    res.send(post);
  } else {
    ("This post does not exist!");
  }
});

app.listen(5000);
