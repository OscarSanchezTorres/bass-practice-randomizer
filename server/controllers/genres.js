const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllGenres(req, res) {
  const genres = await prisma.genres.findMany();
  if (genres) {
    // Return 200 status with the data
    res.status(200).json(genres);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Genres not found" });
  }
}

module.exports = {
  getAllGenres,
};
