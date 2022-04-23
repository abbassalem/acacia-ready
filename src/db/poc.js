var objectUtil = require('./../db/lib/util/object.util');
module.exports = function (){
  var result = {"students": objectUtil.toObject(generateData(),'target')};
  return result;
}


function generateData () {
  return  [
    {
    "id": 1,
    "code": 111,
    "data": {
      "title": "title 1",
      "authorId": 1
    }
  },
  {
      "id": 2,
      "code": 222,
      "data": {
        "title": "title 2",
        "authorId": 2
      }
    }
  ]
}




