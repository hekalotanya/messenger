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

  app.get('/chats/:userId', async (req, res) => {
    const { userId } = req.params;

    const chats = await prisma.chats.findMany({
      where: {
        OR: [
          { recipientId: userId },
          { senderId: userId },
        ],
      }
    });

    await prisma.$disconnect();

    res.send(chats);
  });

  app.post('/chats', async (req, res) => {
    const { senderId, recipientId  } = req.body;

    const chat = await prisma.chats.create({
      data: {
        senderId,
        recipientId,
      },
      select: {
        id: true,
      }
    });

    await prisma.$disconnect();

    res.send(chat);
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
      const user = await prisma.users.findFirst({
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

  app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params

    try {
      const users = await prisma.users.findMany({
        where: {
          NOT: {
            id: +userId,
          },
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        select: {
          id: true,
          username: true,
          createdAt: true,
        }
      });

      res.send(users);
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
        },
        select: {
          id: true,
          username: true,
          token: true,
        }
      });

      res.json(user);

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
      user = await prisma.users.findFirst({
        where: {
          username,
          password,
        },
        select: {
          id: true,
          username: true,
          token: true,
        }
      });

      res.json(user);
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

