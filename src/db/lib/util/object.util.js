module.exports.toObject = function toObject(inputArray, newSubObject) {
  var keys = getKeys(inputArray);
  var initialObject = {};
  initialObject[newSubObject] = [];
  return  inputArray.reduce(function (objectAccumulator, currentItemObject) {
    var oneObject = {};
    for (var i = 0; i < keys.length; i++) {
      oneObject[keys[i]] = currentItemObject[keys[i]];
    }
    objectAccumulator[newSubObject].push(oneObject);
    // objectAccumulator[newSubObject] = oneObject;
    return objectAccumulator;
  }, initialObject);
};

function getKeys(ar){
  var keys = [];
  Object.keys(ar[0]).forEach(function (key) {
    keys.push(key);
  });
  return keys;
}



//firebase database:set /dataDestination ./data.json