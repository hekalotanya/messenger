const express = require('express');
const http = require('http');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');

const initServer = async () => {
  const prisma = new PrismaClient();
  const app = express();
    
  const server = http.createServer(app);

  app.use(cors())
  app.use(express.json());
  app.use(express.static('build'));

  app.get('/chats', async (req, res) => {
    const { userId } = req.body;

    const chats = await prisma.chats.findMany({
      where: {
        OR: {
          recipient_id: userId,
          sender_id: userId,
        }
      }
    });

    await prisma.$disconnect();

    res.send(chats);
  });

  app.get('/chat/:id', async (req, res) => {
    const { id } = req.params

    const chat = await prisma.chats.findUnique({
      where: { id: +id }
    });

    await prisma.$disconnect();

    res.send(chat);
  });

  app.get('/user/:token', async (req, res) => {
    const { token } = req.params

    try {
      const user = await prisma.users.findUnique({
        where: { token }
      });
      
      res.send(user);
    } catch (e) {
      console.log(e);
      res.send(new Error(e));
    } finally {
      await prisma.$disconnect();
    }
  });

  app.post('/chat/:id', async (req, res) => {
    const { id } = req.params;
    const { message, authorId } = req.body

    const createdMessage = await prisma.chatMessages.create({
      data: {
        chatId: +id,
        authorId,
        message,
      }
    });

    await prisma.$disconnect();

    res.send(createdMessage);
  });

  app.post('/sign-up', async (req, res) => {
    let user = null;
    try {
      user = await prisma.users.create({
        data: {
          token: uuidv4(),
          ...req.body,
        }
      });

      res.json({
        id: user.id,
        username: user.username,
        token: user.token,
      });

    } catch (e) {
      console.log(e);
      res.send(new Error(e));
    } finally {
      await prisma.$disconnect();
    }
  });

  app.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;

    let user = null;
    try {
      user = await prisma.users.findUnique({
        where: {
          username,
          password,
        }
      });

      res.json({
        id: user.id,
        username: user.username,
        token: user.token,
      });
    } catch (e) {
      console.log(e);
      res.send(new Error(e));
    } finally {
      await prisma.$disconnect();
    }
  });

  return {
    server,
  };
};
  
module.exports = {
  initServer,
}

