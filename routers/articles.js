const router = require("express").Router();
const {getAllArticles, getArticleComments, getSingleArticle, postNewComment, incrementVote} = require("../controllers/articles");


router.route("/").get(getAllArticles)
router.route("/:article").get(getSingleArticle).put(incrementVote)
router.route("/:article/comments").get(getArticleComments).post(postNewComment)



module.exports = router;