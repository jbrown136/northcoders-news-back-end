const fs = require("fs");
const csv2json = require("csv2json")

fs.createReadStream('seed/data/articles.csv')
.pipe(csv2json({
  separator: ','
}))
.pipe(fs.createWriteStream('seed/data/articles.js'));

fs.createReadStream('seed/data/topics.csv')
.pipe(csv2json({
  separator: ','
}))
.pipe(fs.createWriteStream('seed/data/topics.js'));

fs.createReadStream('seed/data/users.csv')
.pipe(csv2json({
  separator: ','
}))
.pipe(fs.createWriteStream('seed/data/users.js'));

