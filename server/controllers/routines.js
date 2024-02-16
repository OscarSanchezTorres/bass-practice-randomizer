const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllRoutines(req, res) {
  const routines = await prisma.routines.findMany({
    where: {
      active: true,
    },
  });
  if (routines) {
    // Return 200 status with the data
    res.status(200).json(routines);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Routines not found" });
  }
}

async function getRoutine(req, res) {
  const { id } = req.params;
  const routine = await prisma.routines.findMany({
    where: {
      id: parseInt(id),
      active: true,
    },
  });
  if (routine && routine.length == 1) {
    // Return 200 status with the data
    res.status(200).json(routine[0]);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Routine not found" });
  }
}

async function createRoutine(req, res) {
  const { name, description, project_id, technique_id, scale_id, user_id } = req.body;

  const routine = await prisma.routines.create({
    data: { 
        name, 
        description, 
        project_id:  parseInt(project_id), 
        technique_id:  parseInt(technique_id), 
        scale_id:  parseInt(scale_id), 
        user_id:  parseInt(user_id),
       },
  });
  // Return 201 status for successful creation
  res.status(201).json(routine);
}

async function updateRoutine(req, res) {
  const { id } = req.params;
  const { name, description, project_id, technique_id, scale_id, user_id } = req.body;

  const routine = await prisma.routines.findMany({
    where: {
      id: parseInt(id),
      active: true,
    },
  });

  if (routine.length > 0) {
    const updatedRoutine = await prisma.routines.update({
      where: { id: parseInt(id) },
      data: { 
        name, 
        description, 
        project_id:  parseInt(project_id), 
        technique_id:  parseInt(technique_id), 
        scale_id:  parseInt(scale_id), 
        user_id:  parseInt(user_id),
       },
    });
    if (updatedRoutine) {
      // Return 200 status with the data
      res.status(200).json(updatedRoutine);
    }
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Routine not found" });
  }
}

async function deleteRoutine(req, res) {
  const { id } = req.params;

  const routineExists = await prisma.routines.findUnique({
    where: { id: parseInt(id) },
  });

  if (routineExists) {
    await prisma.routines.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });
    // Return 204 status for successful deletion
    res.sendStatus(204);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Routine not found" });
    return;
  }
}

module.exports = {
  getAllRoutines,
  getRoutine,
  createRoutine,
  updateRoutine,
  deleteRoutine,
};
