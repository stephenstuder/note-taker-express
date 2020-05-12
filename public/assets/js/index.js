let $noteTitle = $(".note-title");
let $noteText = $(".note-textarea");
let $saveNoteBtn = $(".save-note");
let $newNoteBtn = $(".new-note");
let $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// A function for getting all notes from the db
let getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
let saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
let deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
let renderActiveNote = () => {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
let handleNoteSave = () => {
  let newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then((data) => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
let handleNoteDelete = (event) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  let note = $(this)
    .parent(".list-group-item")
    .data();

    console.log(note);

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
let handleNoteView = () => {
  activeNote = $(this).data();
  console.log(activeNote);
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
let handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
let handleRenderSaveBtn = () => {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
let renderNoteList = (notes) => {
  $noteList.empty();

  let noteListItems = [];

  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];

    let $li = $("<li class='list-group-item'>").data(note);
    let $span = $("<span>").text(note.title);
    let $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
let getAndRenderNotes = () => {
  return getNotes().then((data) => {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
