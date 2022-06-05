const express = require("express");
const router = express.Router();
const {
  getAllNotesUser,
  addNewNote,
} = require("../controllers/noteController");

//Get all notes
router.get("/", getAllNotesUser);

//Add new note
router.post("/", addNewNote);

module.exports = router;
