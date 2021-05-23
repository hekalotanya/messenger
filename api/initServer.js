const express = require('express');
const http = require('http');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const initServer = async () => {
  const prisma = new PrismaClient();
  const app = express();
    
  const server = http.createServer(app);

  app.use(cors())
  app.use(express.json());
  app.use(express.static('build'));

  app.get('/users', async (req, res) => {
    const users = await prisma.users.findMany();

    console.log(users);

    await prisma.$disconnect();

    res.send(users);
  });

  return {
    server,
  };
};
  
module.exports = {
  initServer,
}

