const Note = require("../model/Note");
const ApiError = require("../model/ApiError");

class NoteDao {



  constructor() {
    this.notes = [];
  }
  //Pre: title and text are not undefined, and title is not empty
  async create({ title, text }) {
    if (title === undefined || title === "") {
      throw new ApiError(400, "Every note must have a none-empty title!");
    }

    if (text === undefined) {
      throw new ApiError(400, "Every note must have a text attribute!");
    }

    const note = await Note.create({title, text});
    return note;
  }

  // Pre: id is a valid note ID
  async update(id, { title, text }) {
    // const index = this.notes.findIndex((note) => note._id === id);
    const note = await Note.findByIdAndUpdate(
      id, 
      {title, text},
      { new: true, runValidators: true}
    );

    if (note === null) {
      throw new ApiError(404, "There is no note with the given ID!");
    }
    return note;
  }

  // Pre: id is a valid note ID
  async delete(id) {
    const note = await Note.findByIdAndDelete(id);

    if (index === null) {
      throw new ApiError(404, "There is no note with the given ID!");
    }
    return note;
  }

  // Pre: id is a valid note ID
  // returns an empty array if there is no note with the given ID
  async read(id) {
    const note = await Note.findById(id);
    return note ? note : [];
  }

  // returns an empty array if there is no note in the database
  //  or no note matches the search query
  async readAll(query = "") {
    if (query !== "") {
      const notes = await Note.find().or([{title: query}, {text: query}]);
      return notes;
    }
    const notes = await Note.find({});
    return notes;
  }
}

module.exports = NoteDao;
