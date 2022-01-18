const PORT = 3001
const http = require("http")
const app = require("./app")
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})