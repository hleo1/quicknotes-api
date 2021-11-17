const mongoose = require("mongoose");

// TODO replace <password> with the password for quicknote-admin
const URI = `mongodb+srv://quicknote-admin:V0yLoIcHN7EbWcby@quickname.rbqxg.mongodb.net/quickNoteDB?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };
