const serve = require('serve');
const {join, resolve} = require('path');
const {readdirSync, lstatSync, writeFileSync} = require('fs');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

const baseDir = join('./apps');
const dirs = getDirectories(baseDir);

// Create config.json
dirs.map(dir => {
  const path = resolve(`${dir}/config.js`);
  const conf = require(path);
  // Write the file
  writeFileSync(`${path}on`, JSON.stringify(conf));
});
