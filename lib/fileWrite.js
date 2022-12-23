const fs = require('fs');
const path = require('path');

function fileWrite(filePath, data, options = {}) {
  return new Promise((resolve, reject) => {
    // Set default options
    const {
      encoding = 'utf8',
      overwrite = false,
      startPosition,
      sync = false,
      createDirs = true,
      lineEnding = '\r\n',
      increment = false,
      exclusive = false
    } = options;

    let writePath = filePath;

    // Check if the file exists and increment the file name if necessary
    if (increment && fs.existsSync(writePath)) {
      const fileDir = path.dirname(writePath);
      const fileExt = path.extname(writePath);
      const fileName = path.basename(writePath, fileExt);

      let index = 1;
      while (fs.existsSync(writePath)) {
        writePath = path.join(fileDir, `${fileName} (${index})${fileExt}`);
        index++;
      }
    }

    let flag;
    if (overwrite) {
      flag = 'w';
    } else {
      flag = 'a';
    }

    if (exclusive) {
      flag = 'wx';
    }

    // Make directories if necessary
    if (createDirs) {
      const dir = path.dirname(writePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    // Convert data to string if necessary
    let dataToWrite;
    if (typeof data === 'string') {
      dataToWrite = data;
    } else {
      dataToWrite = JSON.stringify(data);
    }

    // Write data to file
    if (sync) {
      try {
        fs.writeFileSync(writePath, dataToWrite + lineEnding, { encoding, flag, start: startPosition });
        resolve();
      } catch (error) {
        reject(error);
      }
    } else {
      fs.writeFile(writePath, dataToWrite + lineEnding, { encoding, flag, start: startPosition }, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    }
  });
}



module.exports = fileWrite;