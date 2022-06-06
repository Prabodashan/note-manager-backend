const mongoose = require("mongoose");
const { validateTitle } = require("../helpers/customValidation");

//Create note schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter a title."],
      minLength: [5, "Minimum length of the title would be 5 characters"],
      maxLength: [20, "Maximum length of the title would be 20 characters"],
      validate: [validateTitle, "Enter title only using letters & numbers."],
    },
    details: {
      type: String,
      required: [true, "Enter a details"],
      minLength: [20, "Minimum length of the details would be 20 characters"],
      maxLength: [200, "Maximum length of the details would be 20 characters."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
