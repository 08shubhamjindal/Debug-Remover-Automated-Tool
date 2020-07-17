const fs = require("fs")

const path = require("path")

var index = 0
const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
        arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })
  return arrayOfFiles

}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }


const result = getAllFiles('C:/Users/Shubham Jindal/Documents/JavaScriptProject/Music');

for(var i=0; i<result.length; i++){

    result[i] = replaceAll(result[i], '\\', '/');
}

console.log(result)



fs.readFile(result[result.length-2], 'utf8', function(err, data) {
    let searchString = 'console.log';
    let re = new RegExp('^.*' + searchString + '.*$', 'gm');
    let formatted = data.replace(re, '');
    fs.writeFile(result[result.length-2], formatted, 'utf8', function(err) {
      if (err) return console.log(err);
    });
});
 