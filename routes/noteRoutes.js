const express = require("express");
const router = express.Router();
const {
  getAllNotesUser,
  addNewNote,
  getNoteById,
  updateNote,
  deleteNoteById,
  getNotesBySearch,
} = require("../controllers/noteController");

//Get all notes
router.get("/", getAllNotesUser);

//Add new note
router.post("/", addNewNote);

// Get note by id
router.get("/:noteId", getNoteById);

// Update note by id
router.put("/:noteId", updateNote);

// Update note by id
router.delete("/:noteId", deleteNoteById);

//Search notes
router.get("/search/query", getNotesBySearch);

module.exports = router;
