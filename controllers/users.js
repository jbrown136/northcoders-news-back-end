const { Users, Comments, Topics, Articles } = require("../models/models");

function getAllUsers(req, res, next) {
  Users.find()
    .then(users => {
      const comments = Comments.find()
        .populate("created_by", "username")
        .populate("belongs_to", "title");
      return Promise.all([users, comments]);
    })
    .then(([users, comments]) => {
      const counts = {};
      const ids = comments.map(comment => comment.created_by).forEach(id => {
        counts[id] = counts[id] ? counts[id] + 1 : 1;
      });
      const userComments = users.map(user => {
        const comment_count = counts[user._id] ? counts[user._id] : 0;
        return { user, comment_count };
      });
      res.send({ userComments });
    })
    .catch(next);
}

function getUserByUsername(req, res, next) {
  Users.findOne({ username: req.params.username })
    .then(user => {
      if (user.length === 0)
        next({
          status: 404,
          message: `user ${req.params.username} does not exist`
        });
      else {
        const count = Comments.count({ created_by: user._id });
        return Promise.all([user, count]);
      }
    })
    .then(([user, comment_count]) => {
      res.send({ user, comment_count });
    })
    .catch(next);
}

function getArticlesByUser(req, res, next) {
  Users.findOne({ username: req.params.username })
    .then(user => {
      return Articles.find({ created_by: user._id })
        .populate("created_by", "username")
        .populate("belongs_to", "title");
    })
    .then(articles => {
      const comments = Comments.find({ belongs_to: article._id })
        .populate("created_by", "username")
        .populate("belongs_to", "title");
      return Promise.all([article, comments]);
    })
    .then(([article, comments]) => {
      article.comments = comments;
      res.send({ article, comments });
    })
    .catch(next);
}

function getUserComments(req, res, next) {
  Users.findOne({ username: req.params.username })
    .then(user => {
      return Comments.find({ created_by: user._id })
        .populate("created_by", "username")
        .populate("belongs_to", "title");
    })
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  getArticlesByUser,
  getUserComments
};
