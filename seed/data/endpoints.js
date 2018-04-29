module.exports = {
  Title: "Northcoders News",
  API_Endpoints: {
    GET: {
      "/api/topics": "Get all the topics",
      "/api/topics/:topic/articles":
        "Return all the articles for a certain topic",
      "/api/articles": "Returns all the articles",
      "/api/articles/:article_id": "Returns a single article",
      "/api/articles/:article_id/comments":
        "Get all the comments for a individual article",
      "/api/users": "Returns all the users",
      "/api/users/:username":
        "Returns a JSON object with the profile data for the specified user.",
      "/api/users/:username/articles":
        "Returns a JSON array with all the articles of the specified user.",
      "/api/users/:username/comments":
        "returns a JSON array with all the comments of the specified user"
    },
    POST: {
      "/api/articles/:article_id/comments":
        "Add a new comment to an article. This route requires a JSON body with a comment key and value pair"
    },

    PUT: {
      "/api/articles/:article_id":
        "Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down' e.g: http://northcoders-news-api.herokuapp.com/api/articles/:article_id?vote=up",
      "/api/comments/:comment_id":
        "Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down' e.g: http://northcoders-news-api.herokuapp.com/api/comments/:comment_id?vote=down"
    },
    DELETE: {
      "/api/comments/:comment_id":
        "Deletes a comment if the comment and returns data about the user who posted the comment"
    }
  }
};
