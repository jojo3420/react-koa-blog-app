


const createFakeData = function() {
  const list = [];
  for (let i = 0; i < 40; i++) {
    list.push({
      title: 'sample title' + i,
      body: `'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
       ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
       ${i}`,
      tags: ['a', 'b', 'c'],
    });
  }
  const Post = require('./models/post');
  Post.insertMany(list, (err, docs) => {
     if (err) {
       console.error(err);
     }
    console.log(docs);
  });
};


module.exports = createFakeData;
