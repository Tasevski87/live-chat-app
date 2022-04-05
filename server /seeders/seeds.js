const faker = require('faker');

const db = require('../config/connection');
const { User, Message } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

// create messages
  let createdMessages = [];
  for (let i = 0; i < 100; i += 1) {
    const messageText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdMessage = await Message.create({ messageText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { messages: createdMessage._id } }
    );

    createdMessages.push(createdMessage);
  }

  console.log('all done!');
  process.exit(0);
});
