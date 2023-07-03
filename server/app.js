const usersRouter = require("./routers/users");
const projectsRouter = require("./routers/projects");
const routinesRouter = require("./routers/routines");
const songsRouter = require("./routers/songs");
const genresRouter = require("./routers/genres");
const scalesRouter = require("./routers/scales");
const techniquesRouter = require("./routers/techniques");
const authenticationRouter = require("./routers/authentication");
const { verifyToken } = require("./middleware/authentication");
const express = require('express')
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express()

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Bass Practice Tool API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost.com",
      description: "Local development server",
    },
  ],
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.js"],
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req, res) =>
  res.json(openapiSpecification).status(200)
);

app.use(bodyParser.json());

app.use("/authentication", authenticationRouter);
app.all("*", verifyToken);


app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/routines", routinesRouter);
app.use("/songs", songsRouter);
app.use("/genres", genresRouter);
app.use("/scales", scalesRouter);
app.use("/techniques", techniquesRouter);

module.exports = app;