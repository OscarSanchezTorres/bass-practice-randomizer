const bcrypt = require("bcrypt");
const prisma = require("../utils/prisma");


async function getAllUsers(req, res) {
  const users = await prisma.users.findMany({
    where: {
      active: true,
    },
  });
  if (users && users.length > 0) {
    // Return 200 status with the data
    res.status(200).json(users);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Users not found" });
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  const user = await prisma.users.findMany({
    where: {
      id: parseInt(id),
      active: true,
    },
    select: {
      id: true,
      first_name: true,
      second_name: true,
      email: true,
      projects: {
        select: {
          id: true,
          name: true,
          date_created: true,
          routines: {
            select: {
              id: true,
              name: true,
              description: true,
              technique_id: true,
              scale_id: true,
            },
          },
        },
      },
    },
  });
  if (user && user.length == 1) {
    // Return 200 status with the data
    res.status(200).json(user[0]);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "User not found" });
  }
}

async function createUser(req, res) {
  const { first_name, second_name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      first_name,
      second_name,
      email,
      password: hashedPassword,
    },
  });
  // Return 201 status for successful creation
  res.status(201).json({
    first_name,
    second_name,
    email,
  });
}

async function updateUser(req, res) { // add conditional to make sure user provides password
  const { id } = req.params;
  const { first_name, second_name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.findMany({
    where: {
      id: parseInt(id),
      active: true,
    },
  });

  if (user.length > 0) { 
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        first_name,
        second_name,
        email,
        password: hashedPassword,
      },
    });
    if (updatedUser) {
      // Return 200 status with the data
      res.status(200).json({
        first_name,
        second_name,
        email,
      });
    }
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "User not found" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const userExists = await prisma.users.findUnique({
    where: { id: parseInt(id) },
  });

  if (userExists) {
    await prisma.users.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });
    // Return 204 status for successful deletion
    res.sendStatus(204);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "User not found" });
    return;
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
