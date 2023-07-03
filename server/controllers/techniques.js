const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllTechniques(req, res) {
  const techniques = await prisma.techniques.findMany();
  if (techniques) {
    // Return 200 status with the data
    res.status(200).json(techniques);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Techniques not found" });
  }
}

module.exports = {
  getAllTechniques,
};
