const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    category: [String],
    userId: {
        type: String,
        required: true
    }
})

const Notes = mongoose.model("Note", NoteSchema)

module.exports = Notes
