const PORT = 3000
const http = require("http")
const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const app = express()
const server = http.createServer(app)


server.listen(port=PORT, hostname="localhost", backlog=() => {
    console.log(`Server running on port ${PORT}`)
})