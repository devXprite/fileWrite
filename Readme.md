# fileWrite

A Promise-based utility function for writing data to a file in Node.js.
The filewrite library is a simple and flexible way to write data to a file in Node.js. It provides a number of options to customize the way data is written to the file, including the ability to overwrite or append to the file, write data synchronously or asynchronously, create missing directories leading up to the file, and specify the line ending character(s) to use.

## Installation

To install `fileWrite`, run the following command in your project directory:

```bash
npm i fileWrite
```


## Usage

To use it in EJS module, import the `fileWrite` function using the `import` syntax:
```javascript
import fileWrite from 'filewrite';

fileWrite('/path/to/file.txt', 'Test data');
```

To use it in a CJS module, require it in your project:
```javascript
const fileWrite = require('filewrite');

fileWrite('/path/to/file.txt', 'Test data');
```

## Options

`fileWrite` supports the following options:


| Option | Default | Description |
| ------ | ------- | ----------- |
| encoding| 'utf8' | The encoding to use when writing the data to the file. |
| overwrite | false | A boolean that specifies whether to overwrite the file if it already exists. |
| startPosition | 0 | An integer that specifies the position in the file to start writing the data. |
| sync | false | A boolean that specifies whether to write the data to the file synchronously. |
| createDirs | true | A boolean that specifies whether to create the directories leading up to the file if they do not already exist. |
| lineEnding | '\r\n' | The line ending character(s) to use when writing the data to the file. |
| increment | false | A boolean that specifies whether to increment the file name if the file already exists. If `true` and the file already exists, the file will be renamed by appending a number to the file name, starting with `2`. For example, if the file "foo.txt" already exists and `increment` is `true`, the file will be renamed to "foo (2).txt". |
| exclusive | false | A boolean that specifies whether to create the file exclusively, which means that the file must not already exist. If `true` and the file already exists, the promise will be rejected with an error. |



## Example

Here is an example of how to use `fileWrite` with some of the options:

Incrementing the file name if it already exists. For example, if `increment` is `true`, the file will be renamed to "foo (2).txt" to prevent foo.txt from being overwritten

```javascript
writeFile('/path/to/file.txt', 'Test data', {
  increment: true,
});
```

## License

`fileWrite` is released under the MIT License. See the [LICENSE](LICENSE) file for more details.
