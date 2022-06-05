//Ger all notes of the user
exports.getAllNotesUser = async (req, res) => {
  res.status(200).json("Get all notes of the user");
};

//Add new notes
exports.addNewNote = async (req, res) => {
  res.status(201).json("Add new note");
};
