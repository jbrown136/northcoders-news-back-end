const router = require("express").Router();
const {getAllUsers, getUserByUsername, getArticlesByUser, getUserComments} = require("../controllers/users");


router.route("/").get(getAllUsers)
router.route("/:username").get(getUserByUsername)
router.route("/:username/articles").get(getArticlesByUser)
router.route("/:username/comments").get(getUserComments)


module.exports = router