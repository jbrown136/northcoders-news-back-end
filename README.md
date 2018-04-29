# Northcoders News

This project builds an RESTful API for the Northcoders news application. This project has been hosted on Heroku and can be viewed at https://safe-refuge-86202.herokuapp.com/

### Getting Started

Before starting ensure you have node.js and mongoDB installed.
Clone this project with the command

```
git clone https://github.com/jbrown136/northcoders-news-back-end.git
```

then switch to this project's directory and enter the following commands to set up the project

Install all relevant dependencies

```
npm i
```

Start mongoDB

```
mongod
```

Seed the database

```
npm run seed
```

start the server

```
npm run dev
```

### API endpoints

the following api endpoints are available with this project

get information about api endpoints

```
GET /api
```

get all topics

```
/api/topics
```

get all articles for a specific topic

```
GET /api/topics/:topic/articles
```

get all articles

```
/api/articles
```

get a single article

```
GET /api/articles/:article_id
```

get all comments for an individual article

```
GET /api/articles/:article_id/comments
```

Increment or decrement the votes of an article using a vote query of up or down

```
PUT /api/articles/:article_id
```

get all users

```
GET /api/users
```

get a single user

```
GET /api/users/:username
```

get all articles for an individual user

```
GET /api/users/:username/articles
```

get all comments for an individual user

```
GET /api/users/:username/comments
```

post a new comment

```
POST /api/articles/:article_id/comments
```

Increment or decrement the votes count of a comment using a vote query of up or down

```
PUT /api/comments/:comment_id
```

delete a comment with a specific ID

```
DELETE /api/comments/:comment_id
```

### Built With

* Node - development environment
* MongoDB - NoSQL database
* express - web application framework

#### Acknowledgements

* Northcoders
