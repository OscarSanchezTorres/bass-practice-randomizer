const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProjects(req, res) {
  const projects = await prisma.projects.findMany({
    where: {
      active: true,
    },
  });
  if (projects) {
    // Return 200 status with the data
    res.status(200).json(projects);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Project not found" });
  }
}

async function getProject(req, res) {
  const { id } = req.params;
  const project = await prisma.projects.findMany({
    where: {
      id: parseInt(id),
      active: true,
    },
  });
  if (project && project.length == 1) {
    // Return 200 status with the data
    res.status(200).json(project[0]);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Project not found" });
  }
}

async function getProjectSongs(req, res) {
  const { id } = req.params;
  const projectSongs = await prisma.projects.findMany({
    where: {
      id: parseInt(id),
      active: true,
    },
    include: {
      project_songs: true,
    },
  });
  if (projectSongs && projectSongs.length == 1) {
    // Return 200 status with the data
    res.status(200).json(projectSongs[0]);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Project not found" });
  }
}

async function createProject(req, res) {
  const { name, user_id } = req.body;

  const project = await prisma.projects.create({
    data: {
      name,
      user_id: parseInt(user_id),
    },
  });
  // Return 201 status for successful creation
  res.status(201).json(project);
}

async function updateProject(req, res) {
  const { id } = req.params;
  const { name, user_id } = req.body;

  const project = await prisma.projects.findMany({
    where: {
      id: parseInt(id),
      active: true,
    },
  });

  const user = await prisma.users.findMany({
    where: {
      id: parseInt(user_id),
      active: true,
    },
  });

  if (project.length > 0 && user.length > 0) {
    const updateProject = await prisma.projects.update({
      where: { id: parseInt(id) },
      data: {
        name,
        user_id: parseInt(user_id),
      },
    });
    if (updateProject) {
      // Return 200 status with the data
      res.status(200).json(updateProject);
    }
  }
  if (user.length === 0 && project.length === 0) { // isn't this overkilling?
    // Return 404 status if data is not found
    res.status(404).json({ error: "Project and User not found" });
  } else if (user.length === 0) {
    // Return 404 status if data is not found
    res.status(404).json({ error: "User not found" });
  } else if (project.length === 0) {
    // is else if used correctly in this scenario?
    // Return 404 status if data is not found
    res.status(404).json({ error: "Project not found" });
  }
}

async function deleteProject(req, res) {
  const { id } = req.params;

  const projectExists = await prisma.projects.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (projectExists) {
    await prisma.projects.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });
    // Return 204 status for successful deletion
    res.sendStatus(204);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Project not found" });
    return;
  }
}

module.exports = {
  getAllProjects,
  getProject,
  getProjectSongs,
  createProject,
  updateProject,
  deleteProject,
};
