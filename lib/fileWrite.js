'use strict';

function ownKeys(object, enumerableOnly) {
  const keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ?
      ownKeys(Object(source), !0).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) :
      Object.getOwnPropertyDescriptors ?
      Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source),
      ) :
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key),
        );
      });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const _require = require('fs');
const existsSync = _require.existsSync;
const mkdirSync = _require.mkdirSync;
const writeFileSync = _require.writeFileSync;
const appendFileSync = _require.appendFileSync;
const statSync = _require.statSync;

const _require2 = require('path');
const dirname = _require2.dirname;
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

const fileWrite = function fileWrite(filePath, data, options) {
  let _opts$overwrite; let _opts$newline;

  /** @type {object} */
  const opts = _objectSpread(
      {
        encoding: 'utf8',
      },
      options,
  );
  /** @type {string} */

  const fileDir = dirname(filePath);
  /** @type {boolean} */

  const overWrite =
    (_opts$overwrite = opts.overwrite) !== null && _opts$overwrite !== void 0 ?
      _opts$overwrite :
      false;
  /** @type {boolean} */

  const newLine =
    (_opts$newline = opts.newline) !== null && _opts$newline !== void 0 ?
      _opts$newline :
      true;
  if (!existsSync(fileDir)) {
    mkdirSync(
        fileDir,
        _objectSpread(
            {
              recursive: true,
            },
            options,
        ),
    );
  }

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
