const unknownEndpoint = (request, response) => {
    response.status(404).json({
        error: "Unknown endpoint!",
    })}

module.exports = unknownEndpoint