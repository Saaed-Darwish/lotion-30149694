import React, { useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';
import Sidebar from "./Sidebar.js";
import Main from "./Main.js";

function App() {
  const [notes, setNotes] = useState([])
  const [activeNote, setActiveNote] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [noteNumber, setNoteNumber] = useState();
  const [showSidebar, setShowSidebar] = useState();

  useEffect(() => {
    setShowSidebar(true);
    retrieveNotes();
  }, []);

  const retrieveNotes = () => {
    let retrievedNotes = JSON.parse(localStorage.getItem('currentNotesArray'));

    if (retrievedNotes === null) {
      retrievedNotes = [];
      setNoteNumber(0);
    }

    if (retrievedNotes.length > 0) {
      let lastNote = retrievedNotes[0];
      setNoteNumber(lastNote.noteElement + 1);
    }

    setNotes(retrievedNotes);
  };

  const handleAddNoteClick = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "<p></p>",
      lastModified: "",
      noteElement: noteNumber,
    };

    setNotes([newNote, ...notes]);
    setNoteNumber(noteNumber + 1);
  };

  const handleDeleteClick = (deleteid) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      deleteNote(deleteid);
    }
  };
  
  const deleteNote = (deleteid) => {
    if (notes.length > 2) {
      if (notes[0].id === deleteid) {
        setNoteNumber(notes[1].noteElement + 1);
      }
      else {
        setNoteNumber(notes[0].noteElement + 1);
      }
    }
    setNotes(notes.filter((note) => note.id !== deleteid));
    localStorage.setItem('currentNotesArray', JSON.stringify(notes.filter((note) => note.id !== deleteid)));

    if (notes.length === 2) {
      if (notes[0].id === deleteid) {
        setNoteNumber(notes[0].noteElement);
      }
    }
    if (notes.length === 1) {
      setNoteNumber(0);
    }
  };

  const handleSavedClick = () => {
    setEditMode(false);
    let savedNote = getActiveNote();
    savedNote.lastModified = formatDate(new Date(Date.now()));
    let retrievedNotes = JSON.parse(localStorage.getItem('currentNotesArray'));
    let savedNotes = retrievedNotes;
    let existsNote = savedNotes.find((note) => note.id === activeNote);
    if (existsNote) {
      existsNote.title = savedNote.title;
      existsNote.body = savedNote.body;
      existsNote.lastModified = savedNote.lastModified;
    }
    else {
      savedNotes = [savedNote, ...retrievedNotes];
    }
    localStorage.setItem('currentNotesArray', JSON.stringify(savedNotes));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const setActiveNoteFunction = (noteID) => {
    let currentTemp = getActiveNote();
    if (currentTemp) {
      if (currentTemp.id === noteID) {
        return;
      }
      if (getActiveNote().body !== "<p></p>") {
        updateNote(currentTemp);
      }
    }
    setEditMode(true);
    setActiveNote(noteID);
  };

  const getActiveNote = () => {
    if (activeNote === false) {
      return null;
    }
    return notes.find((note) => note.id === activeNote);
  };

  const updateNote = (updatedNote) => {
    const updateNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updateNotesArray);
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  const toggleSidebar = () => {
    if (showSidebar) {
      setShowSidebar(false);
    }
    else {
      setShowSidebar(true);
    }
  };

  if (showSidebar) {
    return (
      <div className="App">
        <div className="title-lotion"><h1>Lotion</h1></div>
        <button className="sidebar-button" onClick={() => toggleSidebar()}>&#9776;</button>
        <Sidebar notes={notes} handleAddNoteClick={handleAddNoteClick} handleDeleteClick={handleDeleteClick} formatDate={formatDate} activeNote={activeNote} setActiveNoteFunction={setActiveNoteFunction} />
        <Main activeNote={getActiveNote()} updateNote={updateNote} editMode={editMode} handleSavedClick={handleSavedClick} handleEditClick={handleEditClick} />
      </div>
    );
  };

  if (!showSidebar) {
    return (
      <div className="App">
        <div className="title-lotion"><h1>Lotion</h1></div>
        <button className="sidebar-button" onClick={() => toggleSidebar()}>&#9776;</button>
        <Main activeNote={getActiveNote()} updateNote={updateNote} editMode={editMode} handleSavedClick={handleSavedClick} handleEditClick={handleEditClick} />
      </div>
    );
  };

  // could not figure out the routing ...
};

export default App;
