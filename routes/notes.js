const Router = require("express").Router
const noteRouter = new Router()

const controllers = require("../controllers/notes")

noteRouter.get('/', controllers.getAllNotes)
noteRouter.post('/', controllers.createNotes)
noteRouter.patch('/', controllers.updateNotes)
noteRouter.delete('/', controllers.deleteNotes)

module.exports = noteRouter