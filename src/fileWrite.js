const {existsSync, mkdirSync, writeFileSync, appendFileSync, statSync} = require('node:fs');
const {dirname} = require('node:path');

/**
 * Write data to a file
 *
 * @param {string} filePath File path
 * @param {string|Buffer} data Data to write
 * @param {object} options
 * @param {boolean} [options.overwrite=false] OverWrite file
 * @param {boolean} [options.newline=true]
 * @return {void}
 */
const fileWrite = (filePath, data, options) => {
  /** @type {object} */
  const opts = {encoding: 'utf8', ...options};

  /** @type {string} */
  const fileDir = dirname(filePath);

  /** @type {boolean} */
  const overWrite = opts.overwrite ?? false;

  /** @type {boolean} */
  const newLine = opts.newline ?? true;

  if (!existsSync(fileDir)) mkdirSync(fileDir, {recursive: true, ...options});

  if (newLine && existsSync(filePath) && statSync(filePath).size > 0) {
    data = '\n' + data;
  }

  if (overWrite) {
    writeFileSync(filePath, data);
  } else {
    appendFileSync(filePath, data);
  }
};

module.exports = fileWrite;