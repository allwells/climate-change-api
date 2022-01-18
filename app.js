const express = require("express")
const app = express()
const newsRouter = require("./controller/news")

app.use(newsRouter)
app.use((request, response) => {
    response.status(404).json({
        error: "Unknown endpoint!",
    })}
)

module.exports = app