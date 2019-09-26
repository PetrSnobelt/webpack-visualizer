/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const srcFolder = path.join(__dirname, '../lib/');
const cssString = fs.readFileSync(path.join(srcFolder, './style.css'), 'utf8');
const jsString = fs.readFileSync(path.join(srcFolder, './pluginmain.js'), 'utf8');
const srcFile = process.argv.length === 3 ? process.argv[2] : path.join(srcFolder, './stats.json');

console.log("used file:", srcFile);
const data = fs.readFileSync(srcFile, 'utf8');

const template = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Webpack Visualizer</title>
    <style>${cssString}</style>
  </head>
  <body>
    <div id="App"></div>
    <script type="application/json" id="data">
      ${data}
    </script>
    <script>
    window.stats = JSON.parse(document.getElementById("data").textContent);
    ${jsString}
    </script>
  </body>
</html>
`;

fs.writeFileSync('statistic.html', template);
