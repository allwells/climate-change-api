const express = require("express")
const app = express()
const newsRouter = require("./controller/news")
const unknownEndpoint = require("./utils/middleware")

app.use(newsRouter)
app.use(unknownEndpoint)

module.exports = app