# Base Packages for Ghadyani Framework
Base packages Ghadyani Framework applications.

## API Overview

### Functional Helpers
- [`tryCatchFinally`](#trycatchfinally)

### Import Mechanisms
- [`removeFilePathFromRequireCache`](#removefilepathfromrequirecache)
- [`safeImport`](#safeimport)

### Node.js Framework Helpers
- [`createDeprecatedFunction`](#createdeprecatedfunction)
- [`deprecateArgument`](#deprecateargument)

## API Docs

### `safeImport`
Safely imports files with `require` syntax by allowing a `defaultValue` if the file doesn't exist or errors on load.

#### Example
```js
safeImport(
	defaultValue: [],
	filePath: './cache.json',
)
```

#### Args

##### `defaultValue`
`defaultValue` is returned when file doesn't exist.

##### `filePath`
Path to the file for `require`. This path can be a module alias.

### `tryCatchFinally`
A functional method for doing a try-catch-finally. The `catch` exception is also logged.

#### Example
```js
tryCatchFinally({
	defaultValue: [],
	finallyCallback = Function.prototype,
	tryCallback = Function.prototype,
})
```

#### Args

##### `defaultValue`
`defaultValue` is returned when exception caught.

##### `finallyCallback`
Called when `finally` occurs.

##### `tryCallback`
Called when `try` occurs.
