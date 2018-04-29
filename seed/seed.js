var models = require("../models/models");
var mongoose = require("mongoose");
var config = require("../config");
mongoose.Promise = Promise;
const {
  articlesData,
  topicsData,
  usersData,
  commentsData
} = require("./data/index.js");
const { Users, Comments, Topics, Articles } = require("../models/models");
articlesData.forEach(article => {
  article.belongs_to = article.topic;
  article.created_by =
    usersData[Math.floor(Math.random() * usersData.length)].username;
});

function seedArticles(articlesData) {
  const ids = {};
  const articlePromises = articlesData.map(article => {
    const { title, body, belongs_to, created_by, votes } = article;
    return new Articles({
      title,
      body,
      belongs_to,
      created_by,
      votes
    })
      .save()
      .then(articleData => {
        ids[article.belongs_to] = articleData._id;
        ids[article.title] = articleData._id;
        return articleData;
      });
  });
  return Promise.all(articlePromises)
    .then(() => ids)
    .catch(err => {
      console.log(err);
    });
}

function seedTopics(topicsData) {
  const ids = {};
  const topicPromises = topicsData.map(topic => {
    const { title, slug } = topic;
    return new Topics({
      title,
      slug
    })
      .save()
      .then(topicData => {
        ids[topic.slug] = topicData._id;
        return topicData;
      });
  });
  return Promise.all(topicPromises)
    .then(() => {
      return ids;
    })
    .catch(err => {
      console.log(err);
    });
}

function seedUsers(usersData) {
  const ids = {};
  const userPromises = usersData.map(user => {
    const { username, name, avatar_url } = user;
    return new Users({
      username,
      name,
      avatar_url
    })
      .save()
      .then(userData => {
        ids[user.username] = userData._id;
        return userData;
      });
  });

  return Promise.all(userPromises)
    .then(() => ids)
    .catch(err => {
      console.log(err);
    });
}

function seedComments(commentsData) {
  const ids = {};
  const commentPromises = commentsData.map(comment => {
    const { body, belongs_to, created_by, votes } = comment;
    return new Comments({
      body,
      belongs_to,
      created_by,
      votes
    })
      .save()
      .then(commentData => {
        ids[comment.belongs_to] = commentData._id;
        ids[comment.created_by] = commentData._id;
        return commentData;
      });
  });
  return Promise.all(commentPromises).then(() => ids);
}

function seedDatabase(articlesData, topicsData, usersData, commentsData) {
  mongoose.connection
    .dropDatabase()
    .then(() => {
      return seedTopics(topicsData);
    })
    .then(topics => {
      console.log("seeded topics");
      articlesData.forEach(article => {
        article.belongs_to = topics[article.belongs_to];
      });
      return seedUsers(usersData);
    })
    .then(users => {
      console.log("seeded users");
      articlesData.forEach(article => {
        article.created_by = users[article.created_by];
      });
      commentsData.forEach(comment => {
        comment.created_by = users[comment.created_by];
      });
      return seedArticles(articlesData);
    })
    .then(articles => {
      console.log("seeded articles");
      commentsData.forEach(comment => {
        comment.belongs_to = articles[comment.belongs_to];
      });
      return seedComments(commentsData);
    })
    .then(comments => {
      console.log("seeded comments");
      console.log("Database seeded!");
      return mongoose.disconnect();
    })
    .catch(err => console.log("error", err));
}

seedDatabase(articlesData, topicsData, usersData, commentsData);
