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

  it('returns a promise if the async option is true', async () => {
    const promise = fileWrite('testDir/test-file.txt', 'Test data', { async: true });

    expect(promise).to.be.an.instanceof(Promise);

    const resolvedValue = await promise;
    expect(resolvedValue).to.be.undefined;

    const fileExists = fs.existsSync('testDir/test-file.txt');
    expect(fileExists).to.be.true;
  });

  it('returns undefined if the async option is false', () => {
    const returnValue = fileWrite('testDir/test-file.txt', 'Test data', { async: false });

    expect(returnValue).to.be.undefined;

    const fileExists = fs.existsSync('testDir/test-file.txt');
    expect(fileExists).to.be.true;
  });
  
  it('writes data to the file', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data');
    const fileData = fs.readFileSync('testDir/test-file.txt', 'utf8');
    expect(fileData).to.equal('Test data\n');
  });

  it('overwrites the file if the overwrite option is true', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data');
    await fileWrite('testDir/test-file.txt', 'Overwritten data', { overwrite: true });
    const fileData = fs.readFileSync('testDir/test-file.txt', 'utf8');
    expect(fileData).to.equal('Overwritten data\n');
  });

  it('appends the data to the file if the overwrite option is false', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data');
    await fileWrite('testDir/test-file.txt', 'Appended data', { overwrite: false });
    const fileData = fs.readFileSync('testDir/test-file.txt', 'utf8');
    expect(fileData).to.equal('Test data\nAppended data\n');
  });

  it('increments the file name if the increment option is true and the file already exists', async () => {
    await fileWrite('testDir/test-file.txt', 'Test data');
    await fileWrite('testDir/test-file.txt', 'Test data', { increment: true });
    const fileData = fs.readFileSync('testDir/test-file (1).txt', 'utf8');
    expect(fileData).to.equal('Test data\n');
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
