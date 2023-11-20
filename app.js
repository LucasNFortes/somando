const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000);

//----------------------------------------------------

const glob = require('glob');

const cssFiles = glob.sync('**/css/*.css');
const jsFiles = glob.sync('**/scripts/*.js');

for (const file of cssFiles) {
  require(file);
}

for (const file of jsFiles) {
  require(file);
}