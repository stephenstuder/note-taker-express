const express = require("express");
const notes = require("./db/notes");
const app = express();
app.use(express.static(__dirname + '/public'));

const PORT = process.argv.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html")
});

app.get("/api/notes", (req, res) => {
  console.log(`/api/notes called`);
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  console.log(`POST /api/notes called`);
  const newNote = req.body;
  console.log(newNote);
  notes.push(newNote);
  res.json(newNote);
});

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
});

app.delete("/api/notes/:id", (req, res) => {
  //todo, use id to find a note and delete it. 
});


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:/${PORT}`);
});