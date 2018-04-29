const { Users, Comments, Topics, Articles } = require("../models/models");
function getAllTopics(req, res, next) {
  Topics.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
}
function getArticlesByTopic(req, res, next) {
  Topics.findOne({ slug: req.params.topic })
    .then(topic => {
      return Articles.find({ belongs_to: topic._id })
        .populate("belongs_to", "title slug")
        .populate("created_by", "user username");
    })
    .then(articles => {
      const comments = Comments.find()
        .populate("created_by", "username")
        .populate("belongs_to", "title");
      return Promise.all([articles, comments]);
    })
    .then(([articles, comments]) => {
      const counts = {};
      const ids = comments.map(comment => comment.belongs_to).forEach(id => {
        counts[id] = counts[id] ? counts[id] + 1 : 1;
      });
      const articleComments = articles.map(article => {
        const comment_count = counts[article._id] ? counts[article._id] : 0;
        return { article, comment_count };
      });

      res.send({ articleComments });
    })
    .catch(next);
}
module.exports = { getAllTopics, getArticlesByTopic };
