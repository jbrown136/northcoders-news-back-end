const { Users, Comments, Topics, Articless } = require("../models/models");

function incrementVote(req, res, next) {
  Comments.findOne({ _id: req.params.comment })
    .then(comment => {
      let votes = comment.votes;
      if (req.query.vote === "up") votes++;
      else if (req.query.vote === "down" && votes !== 0) votes--;
      return Comments.findOneAndUpdate(
        { _id: req.params.comment },
        { $set: { votes: votes } }
      );
    })
    .then(comment => {
      return Comments.findOne({ _id: req.params.comment });
    })
    .then(comment => {
      let vote;
      if (comment.votes === 1) votes = "vote";
      else votes = "votes";
      res
        .status(204)
        .send(
          `comment ${req.params.comment} now has ${comment.votes} ${votes}`
        );
    })
    .catch(next);
}

function deleteComment(req, res, next) {
  console.log(req.params.comment);
  Comments.findOneAndRemove({ _id: req.params.comment })
    .then(comment => {
      Users.findOne({ _id: comment.created_by });
    })
    .then(user => {
      res.send({ user });
    })
    .catch(next);
}

module.exports = { incrementVote, deleteComment };
