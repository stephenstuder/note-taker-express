const express = require("express");
const notes = require("./db/notes");
const uniqid = require("uniqid");
const app = express();
app.use(express.static(__dirname + '/public'));

const PORT = process.argv.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//==============================================================================//
//API Routes
//==============================================================================//

//Retrieves Notes
app.get("/api/notes", (req, res) => {
  console.log(`/api/notes called`);
  res.json(notes);
});

//Posts a Note to database
app.post("/api/notes", (req, res) => {
  console.log(`POST /api/notes called`);
  const newNote = req.body;
  newNote.id = uniqid();
  console.log(newNote);
  notes.push(newNote);
  res.json(true);
});


//Todo delete a note
app.delete("/api/notes/:id", (req, res) => {
   console.log(`/api/notes/${req.params.id} called`);
  
   let notesId = req.params.id;
  
   for (let i = 0; i < notes.length; i++) {
       if (notes[i].id === notesId) {
           console.log(notes[i]);

           return res.json(notes[i]);
       }
   }
  
   return res.json(false);
});
  
  //==============================================================================//
  //Html Routes
  //==============================================================================//
  
  //Notes Page
  app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html")
  });
  
  //Home page catch all
  app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
  });
  
  app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:/${PORT}`);
});