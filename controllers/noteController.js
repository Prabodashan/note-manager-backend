const Note = require("../models/noteModel");

//Ger all notes of the user
exports.getAllNotesUser = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.json({ errors: { message: err.message } });
  }
};

//Add new notes
exports.addNewNote = async (req, res) => {
  const { title, details } = req.body;

  //check if note title already exists
  const noteByTitle = await Note.findOne({ title });
  if (noteByTitle) {
    return res.json({ errors: { message: "Note title already exists!" } });
  }

  //Create new note
  const newNote = new Note({ title, details });
  try {
    //Save new note
    await newNote.save();
    return res.status(201).json({
      created: true,
      success: { message: "Note successfully created!" },
    });
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

//Get note by id
exports.getNoteById = async (req, res) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findById(noteId);
    return res.status(200).json(note);
  } catch (err) {
    return res.json({
      errors: { message: Object.entries(err.errors)[0][1].message },
    });
  }
};

exports.updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, details } = req.body;

  if (noteId.length !== 24) {
    return res.json({
      errors: { message: "Provided note id doesn't compatible!" },
    });
  }

  //Check if note available according to the id
  const noteById = await Note.findById(noteId);
  if (!noteById) {
    return res.json({ errors: { message: "Note doesn't exist!!" } });
  }

  //Check if note title already exist
  const noteByTitle = await Note.findOne({ title });
  if (noteByTitle) {
    if (noteByTitle.id !== noteId) {
      return res.json({ errors: { message: "Note title already exist!!" } });
    }
  }

  try {
    await Note.findByIdAndUpdate(
      { _id: noteId },
      {
        title,
        details,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      created: true,
      success: { message: "Note successful updated!!" },
    });
  } catch (err) {
    return res.json({
      errors: { message: Object.entries(err.errors)[0][1].message },
    });
  }
};

//Delete note
exports.deleteNoteById = async (req, res) => {
  const { noteId } = req.params;

  if (noteId.length !== 24) {
    return res.json({
      errors: { message: "Provided note id doesn't compatible!" },
    });
  }

  const noteById = await Note.findById(noteId);
  if (!noteById) {
    return res.json({ errors: { message: "Note doesn't exist!!" } });
  }
  try {
    await Note.findByIdAndDelete(noteId);
    res.status(200).json({
      created: true,
      success: { message: "Note successful deleted!!" },
    });
  } catch (err) {
    res.json({ errors: { message: Object.entries(err.errors)[0][1].message } });
  }
};

//Search notes
exports.getNotesBySearch = async (req, res) => {
  const { query } = req.params;
  try {
    const regexQuery = new RegExp(query, "i");
    const notes = await Todo.find({
      $or: [{ title: regexQuery }, { details: regexQuery }],
    });
    return res.status(200).json(notes);
  } catch (err) {
    res.json({ errors: { message: Object.entries(err.errors)[0][1].message } });
  }
};
