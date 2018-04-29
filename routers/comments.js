const router = require("express").Router();
const {incrementVote, deleteComment} = require("../controllers/comments");

router.route("/:comment").put(incrementVote).delete(deleteComment)


module.exports = router