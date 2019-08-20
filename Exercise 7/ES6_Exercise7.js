

// test object
let sampleObject = [{foo: 'red'}, {foo: 'blue'}, {foo: 'green'}]

pluckPrototype = (objectArr, key) => { return objectArr.map((obj) => obj[key]);}

// test pluck function
console.log(pluckPrototype(sampleObject, 'foo'));