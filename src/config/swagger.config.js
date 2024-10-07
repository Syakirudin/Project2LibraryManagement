const {name, version} = require ("../../package.json")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: name, version
        },
    },
    apis: ["./src/routers/*.js", "./src/models/*.js"],
}

const swaggerSpecification = swaggerJsDoc(swaggerConfig)

module.exports = {swaggerSpecification} 