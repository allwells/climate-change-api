const PORT = 3000
const http = require("http")
const app = require("./controller/news")
const server = http.createServer(app)

server.listen(port=PORT, backlog=() => {
    console.log(`Server running on PORT ${PORT}`)
})