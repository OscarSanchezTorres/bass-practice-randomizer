const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllSongs(req, res) {
  const songs = await prisma.songs.findMany({
    where: {
      active: true,
    },
  });
  if (songs) {
    // Return 200 status with the data
    res.status(200).json(songs);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Songs not found" });
  }
}

async function getSong(req, res) {
  const { id } = req.params;
  const song = await prisma.songs.findMany({
    where: {
      id: parseInt(id),
      active: true,
    },
  });
  if (song && song.length == 1) {
    // Return 200 status with the data
    res.status(200).json(song[0]);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Song not found" });
  }
}

async function createSong(req, res) {
  const { name, artist, album, key  } = req.body;

  const song = await prisma.songs.create({
    data: { 
        name, 
        artist, 
        album,
        key,
       },
  });
  // Return 201 status for successful creation
  res.status(201).json(song);
}

async function updateSong(req, res) {
  const { id } = req.params;
  const { name, artist, album, key } = req.body;

  const song = await prisma.songs.findMany({
    where: {
      id: parseInt(id),
      active: true,
    },
  });

  if (song.length > 0) {
    const updatedSong = await prisma.songs.update({
      where: { id: parseInt(id) },
      data: { 
        name, 
        artist, 
        album,
        key,
       },
    });
    if (updatedSong) {
      // Return 200 status with the data
      res.status(200).json(updatedSong);
    }
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Song not found" });
  }
}

async function deleteSong(req, res) {
  const { id } = req.params;

  const songExists = await prisma.songs.findUnique({
    where: { id: parseInt(id) },
  });

  if (songExists) {
    await prisma.songs.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });
    // Return 204 status for successful deletion
    res.sendStatus(204);
  } else {
    // Return 404 status if data is not found
    res.status(404).json({ error: "Song not found" });
    return;
  }
}

module.exports = {
  getAllSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
};
