require('dotenv').config();
const { initServer } = require('./initServer');
const port = process.env.PORT;

process.on('uncaughtException', (e) => {
  console.warn(e.stack);
});

process.on('unhandledRejection', (reason) => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${reason}`);
});

initServer()
  .then(({ server }) => {
    server.listen({ port }, () => {
      console.info(
        ' 🚀🚀🚀 🚀🚀🚀 🚀🚀🚀',
        `✔️ Api server is ready`,
        '🚀🚀🚀 🚀🚀🚀 🚀🚀🚀',
      );
    });
  })
  .catch((error) => {
    console.error('API SERVER CANNOT START', error.stack);
  });