# fileWrite

A Promise-based utility function for writing data to a file in Node.js.
The filewrite library is a simple and flexible way to write data to a file in Node.js. It provides a number of options to customize the way data is written to the file, including the ability to overwrite or append to the file, write data synchronously or asynchronously, create missing directories leading up to the file.

## Installation

To install `fileWrite`, run the following command in your project directory:

```bash
npm i file-write
```


## Usage

To use it in EJS module, import the `fileWrite` function using the `import` syntax:
```javascript
import fileWrite from 'file-write';

fileWrite('path/to/file.txt', 'Test data');
```

To use it in a CJS module, require it in your project:
```javascript
const fileWrite = require('file-write');

fileWrite('path/to/file.txt', 'Test data');
```

## Options

The `filewrite` function accepts the following options:

### `options.overwrite`

**Type:** `boolean`  
**Default:** `true`

If set to `true`, the file will be overwritten with the new data. If set to `false`, the data will be appended to the file.

```javascript
// Overwrite the file with new data
await fileWrite('path/to/file.txt', 'Test data', {
overwrite: true
});

// Append data to the file
await fileWrite('path/to/file.txt', 'Appended data', {
overwrite: false
});
```


### `options.async` 

**Type:** `boolean`  
**Default:** `true`

If set to `true`, the data will be written asynchronously (return a promise). If set to `false`, the data will be written synchronously.

```javascript
// Write data to the file synchronously (blocking) return undefined
fileWrite('path/to/file.txt', 'Test data', { async: false });

// Write data to the file asynchronously (non-blocking) and return a promise
fileWrite('path/to/file.txt', 'Test data', { async: true }).then(() => {
  console.log('File written successfully!');
}).catch((err) => {
  console.error(err);
});
```


### `options.newLine`

**Type:** `boolean`  
**Default:** `true`

It Ensure that contents has a trailing newline before writing it to the file.


### `options.increment` 

**Type:** `boolean`  
**Default:** `false`

If set to `true` and the file already exists, the file will be renamed to include a number in parentheses after the file name. For example, if the file is named `foo.txt` and `increment` is `true`, the file will be renamed to `foo (2).txt`.

```javascript
// Increment the file name if the file already exists
await fileWrite('path/to/file.txt', 'Test data', {
increment: true
});
```


### `options.exclusive` 

**Type:** `boolean`  
**Default:** `false`

If set to `true`, the promise will be rejected with an error if the file already exists. If set to `false`, the file will be overwritten or appended to depending on the value of the `overwrite` option.

```javascript
// Reject the promise with an error if the file already exists
await fileWrite('path/to/file.txt', 'Test data', {
exclusive: true
});
```


## License

The `filewrite` library is released under the MIT license. See [LICENSE](LICENSE) for more details.