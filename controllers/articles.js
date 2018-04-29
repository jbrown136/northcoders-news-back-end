const { Users, Comments, Topics, Articles } = require("../models/models");

function getAllArticles(req, res, next) {
  Articles.find()
    .populate("belongs_to", "title")
    .populate("created_by", "username")
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

function getArticleComments(req, res, next) {
  Articles.findOne({ _id: req.params.article })
    .then(article => {
      return Comments.find({ belongs_to: article._id })
        .populate("created_by", "username")
        .populate("belongs_to", "title created_by")
        .populate("belongs_to.created_by", "username");
    })
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
}

function getSingleArticle(req, res, next) {
  Articles.findOne({ _id: req.params.article })
    .populate("belongs_to", "title")
    .populate("created_by", "username")
    .then(article => {
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

function postNewComment(req, res, next) {
  const { article } = req.params;
  const { comment } = req.body;
  return new Comments({
    body: comment,
    belongs_to: article,
    votes: 0,
    created_by: "5ac613bc979c5b36039e8bbd"
  })
    .save()
    .then(comment => res.status(201).json({ comment }))
    .catch(err => res.send(err));
}

function incrementVote(req, res, next) {
  Articles.findOne({ _id: req.params.article })
    .then(article => {
      let votes = article.votes;
      if (req.query.vote === "up") votes++;
      else if (req.query.vote === "down" && votes !== 0) votes--;
      return Articles.findOneAndUpdate(
        { _id: req.params.article },
        { $set: { votes: votes } }
      );
    })
    .then(article => {
      return Articles.findOne({ _id: req.params.article });
    })
    .then(article => {
      let vote;
      if (article.votes === 1) votes = "vote";
      else votes = "votes";
      res
        .status(204)
        .send(
          `article ${req.params.article} now has ${article.votes} ${votes}`
        );
    })
    .catch(next);
}

module.exports = {
  getAllArticles,
  getArticleComments,
  getSingleArticle,
  postNewComment,
  incrementVote
};
