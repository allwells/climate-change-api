const http = require("http")
const app = require("./app")
const server = http.createServer(app)
const config = require("./utils/config")

server.listen(config.PORT, () => {
    console.log(`Server running on PORT ${config.PORT}`)
})