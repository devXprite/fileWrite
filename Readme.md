# fileWrite

A Promise-based utility function for writing data to a file in Node.js.

## Installation

To install `fileWrite`, run the following command in your project directory:

```bash
npm i fileWrite
```


## Usage

To use `fileWrite`, require the module and call the `fileWrite` function with the file path and the data to write to the file:

```javascript
const fileWrite = require('filewrite');

fileWrite('/path/to/file.txt', 'Some data to write to the file')
.then(() => {
console.log('Write succeeded');
})
.catch((error) => {
console.error(error);
});
```


## Options

`fileWrite` supports the following options:

- `encoding`: The encoding to use when writing the data to the file. Defaults to `'utf8'`.
- `overwrite`: A boolean that specifies whether to overwrite the file if it already exists. Defaults to `false`.
- `startPosition`: An integer that specifies the position in the file to start writing the data. Defaults to `0`.
- `sync`: A boolean that specifies whether to write the data to the file synchronously. Defaults to `false`.
- `createDirs`: A boolean that specifies whether to create the directories leading up to the file if they do not already exist. Defaults to `true`.
- `lineEnding`: The line ending character(s) to use when writing the data to the file. Defaults to `'\n'`.
- `increment`: A boolean that specifies whether to increment the file name if the file already exists. If `true` and the file already exists, the file will be renamed by appending a number to the file name, starting with `2`. For example, if the file "foo.txt" already exists and `increment` is `true`, the file will be renamed to "foo (2).txt". Defaults to `false`.
- `exclusive`: A boolean that specifies whether to create the file exclusively, which means that the file must not already exist. If `true` and the file already exists, the promise will be rejected with an error. Defaults to `false`.

## Example

Here is an example of how to use `fileWrite` with some of the options:

```javascript
ileWrite('/path/to/file.txt', 'Some data to write to the file', { encoding: 'utf8', overwrite: false, createDirs: true, lineEnding: '\r\n', increment: true, exclusive: false })
.then(() => {
console.log('Write succeeded');
})
.catch((error) => {
console.error(error);
});
```


This example writes the data to the file `/path/to/file.txt` using UTF-8 encoding, appends a new line character (`'\r\n'`) to the end of the data, creates the directories leading up to the file if they do not already exist, and increments the file name if the file already exists.

## License

`fileWrite` is released under the MIT License. See the [LICENSE](LICENSE) file for more details.
