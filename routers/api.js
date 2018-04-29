const router = require("express").Router();
const topicsRouter = require("./topics");
const articlesRouter = require("./articles");
const usersRouter = require("./users");
const commentsRouter = require("./comments");
const endpoints = require("../seed/data/endpoints")

router.use("/topics", topicsRouter);
router.use("/articles", articlesRouter);
router.use("/users", usersRouter);
router.use("/comments", commentsRouter);
router.get("/", (req, res) => {
    res.send({endpoints})
})


module.exports = router;