const NotesModel = require("../models/notes")

const getUser = function (req, res) {
    const userId = req.oidc.user.sub
    return userId
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await NotesModel.find()
        // res.status(200).json({ status: true, notes: notes })
        res.status(200).render('all-notes', { notes: notes })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, error: err.message })
    }
}

const createNotes = async (req, res) => {
    const newNote = req.body
    const user_Id = getUser(req, res)
    try {
        const notes = await NotesModel.create({
            title: newNote.title,
            body: newNote.body,
            tags: newNote.tags,
            category: newNote.category,
            userId: user_Id
        })
        res.status(200).json({ status: "Created", notes: notes })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, error: err.message })
    }
}

const updateNotes = async (req, res) => {
    const { id: id } = req.params
    const newDetails = req.body
    try {
        const notes = await NotesModel.findOneAndUpdate({ _id: id }, newDetails, { new: true })
        res.status(200).json({ status: "Updated", notes: notes })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, error: err.message })
    }
}


const deleteNotes = async (req, res) => {
    const { id: id } = req.params
    try {
        const notes = await NotesModel.findOneAndDelete({ _id: id })
        res.status(200).json({ status: "Deleted", notes: notes })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, error: err.message })
    }
}



module.exports = { getAllNotes, createNotes, updateNotes, deleteNotes }