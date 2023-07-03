const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllScales(req, res) {
  const scales = await prisma.scales.findMany();
  if (scales) {
    // Return 200 status with the data
    res.status(200).json(scales);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Scales not found" });
  }
}

module.exports = {
  getAllScales,
};
