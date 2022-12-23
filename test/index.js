const fileWrite = require('../lib/fileWrite');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

describe('fileWrite', () => {
  afterEach(() => {
    // Clean up by deleting the test file
    fs.unlinkSync('testDir/test-file.txt');
  });

  // remove the test directory after all tests have run even if directory is not empty
  after(() => {
    fs.rmdirSync('testDir', { recursive: true });
  });

  it('writes data to the file', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data');
    const fileData = fs.readFileSync('testDir/test-file.txt', 'utf8');
    expect(fileData).to.equal('Test data\r\n');
  });

  it('overwrites the file if the overwrite option is true', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data');
    await fileWrite('testDir/test-file.txt', 'Overwritten data', { overwrite: true });
    const fileData = fs.readFileSync('testDir/test-file.txt', 'utf8');
    expect(fileData).to.equal('Overwritten data\r\n');
  });

  it('appends the data to the file if the overwrite option is false', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data');
    await fileWrite('testDir/test-file.txt', 'Appended data', { overwrite: false });
    const fileData = fs.readFileSync('testDir/test-file.txt', 'utf8');
    expect(fileData).to.equal('Test data\r\nAppended data\r\n');
  });

  it('writes the data synchronously if the sync option is true', async () => {
    fileWrite('testDir/test-file.txt', 'Test data', { sync: true });
    const fileData = fs.readFileSync('testDir/test-file.txt', 'utf8');
    expect(fileData).to.equal('Test data\r\n');
  });

//   it('creates the directories leading up to the file if the createDirs option is true', async () => {
//     await fileWrite('testDir/nested/test-file.txt', 'Test data', { createDirs: true });
//     const fileData = fs.readFileSync('testDir/nested/test-file.txt', 'utf8');
//     expect(fileData).to.equal('Test data\r\n');
//   });

//   it('rejects the promise with an error if the createDirs option is false and the directories do not exist', async () => {
//     try {
//       await fileWrite('testDir/nested/test-file.txt', 'Test data', { createDirs: false });
//       throw new Error('Expected promise to be rejected');
//     } catch (error) {
//       expect(error).to.be.an('error');
//     }
//   });

  it('uses the specified line ending character(s) when writing the data to the file', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data', { lineEnding: '\r\n' });
    const fileData = fs.readFileSync('testDir/test-file.txt', 'utf8');
    expect(fileData).to.equal('Test data\r\n');
  });

  it('increments the file name if the increment option is true and the file already exists', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data');
    await fileWrite('testDir/test-file.txt', 'Test data', { increment: true });
    const fileData = fs.readFileSync('testDir/test-file (1).txt', 'utf8');
    expect(fileData).to.equal('Test data\r\n');
  });

  it('rejects the promise with an error if the exclusive option is true and the file already exists', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data');
    try {
      await fileWrite('testDir/test-file.txt', 'Test data', { exclusive: true });
      throw new Error('Expected promise to be rejected');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
});
