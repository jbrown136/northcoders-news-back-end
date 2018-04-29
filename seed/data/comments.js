const articles = require("./articles.js");
const users = require("./users.js");
const faker = require("faker");
const comments = [];

for (let i = 0; i < 200; i++) {
  comments.push({
    body: faker.fake("{{random.words}}"),
    belongs_to: articles[Math.floor(Math.random() * articles.length)].title,
    created_by: users[Math.floor(Math.random() * users.length)].username,
    votes: Math.floor(Math.random() * users.length)
  });
}
module.exports = comments;
