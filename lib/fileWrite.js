const fs = require('fs');
const path = require('path');

/**
 * Write data to a file.
 *
 * @param {string} filePath - The path of the file to write.
 * @param {string|Buffer} data - The data to write to the file.
 * @param {Object} [options] - The options for writing the file.
 * @param {boolean} [options.overwrite=true] - If true, the file will be overwritten; if false, the data will be appended to the file.
 * @param {boolean} [options.sync=false] - If true, the write will be performed synchronously; if false, a promise will be returned.
 * @param {boolean} [options.createDirs=true] - If true, any missing directories leading up to the file will be created.
 * @param {boolean} [options.newLine=true] - If true, a trailing newline will be added to the data if it doesn't already have one.
 * @param {boolean} [options.increment=false] - If true and the file already exists, the file name will be incremented (e.g. "foo.txt" -> "foo (2).txt").
 * @param {boolean} [options.exclusive=false] - If true and the file already exists, the promise will be rejected with an error.
 * @param {string} [options.encoding='utf8'] - The encoding to use for the file.
 * @return {Promise|undefined} - If `sync` is false, a promise that resolves when the write is complete; otherwise, undefined.
 * @throws {Error} - If the file already exists and `exclusive` is true.
 */

function fileWrite(filePath, data, options = {}) {
  // Define default options
  const defaultOptions = {
    encoding: 'utf8',
    overwrite: false,
    sync: false,
    createDirs: true,
    increment: false,
    exclusive: false,
    newLine: true
  };

  // Merge default options with user-specified options
  options = {
    ...defaultOptions,
    ...options
  };

  if (options.newLine && !data.endsWith('\n')) {
    data += '\n';
  }

  // Create the directories leading up to the file if they don't exist
  if (options.createDirs) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, {
        recursive: true
      });
    }
  }

  // Check if the file already exists and handle it according to the 'increment' and 'exclusive' options
  if (fs.existsSync(filePath)) {
    if (options.increment) {
      // Increment the file name if the file already exists
      const fileDir = path.dirname(filePath);
      const fileExt = path.extname(filePath);
      const fileName = path.basename(filePath, fileExt);

      let index = 1;
      while (fs.existsSync(filePath)) {
        filePath = path.join(fileDir, `${fileName} (${index})${fileExt}`);
        index++;
      }
    } else if (options.exclusive) {
      // Reject the promise with an error if the file already exists
      return Promise.reject(new Error(`File already exists: ${filePath}`));
    }
  }

  // Write the data to the file
  if (options.sync) {
    // Write the data synchronously
    fs.writeFileSync(filePath, data, {
      encoding: options.encoding,
      mode: 0o644,
      flag: options.overwrite ? 'w' : 'a',
      autoClose: true,
      emitCloseEvent: true
    });
  } else {
    // Write the data asynchronously (using a promise)
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, {
        encoding: options.encoding,
        flag: options.overwrite ? 'w' : 'a',
        autoClose: true,
        emitCloseEvent: true
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}


module.exports = fileWrite;