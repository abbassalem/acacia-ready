var objectUtil = require('./lib/util/object.util');
var input =   [
  {"id": 1,"title": "Build an API using GO", "authorId": 2 },
  { "id": 2, "title": "Build an API using API Platform", "authorId": 1}
];
var newObject = objectUtil.toObject(input,'target');
