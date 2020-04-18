const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid repository Id" });
  }

  return next();
}

// app.use(validateRepositoryId);

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: likes
  };

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", validateRepositoryId, (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex((respository) => respository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const repositoryUpdated = {
    id,
    title,
    url,
    techs
  };

  repositories[repositoryIndex] = repositoryUpdated;

  return response.json(repositoryUpdated);
});

app.delete("/repositories/:id", validateRepositoryId, (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((respository) => respository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositores = repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", validateRepositoryId, (request, response) => {
  // TODO
});

module.exports = app;
