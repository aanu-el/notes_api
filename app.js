const express = require("express")
const bodyParser = require("body-parser")
const { requiresAuth } = require("express-openid-connect")
require("dotenv").config()

const connectToDb = require("./config/db")
const noteRouter = require("./routes/notes")
const auth0Middleware = require('./auth/auth0')

const app = express()
connectToDb()

// Add Middleware here
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(auth0Middleware)

app.use('/notes', requiresAuth(), noteRouter)
app.get('/', (req, res) => {
    res.render('index', {
        user: req.oidc.user
    })
})

app.post('/logout', (req, res) => {
    req.oidcLogout()
    res.redirect('/')
})

// Error Handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('Something Broke!')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App Listening on PORT ${PORT}`)
})