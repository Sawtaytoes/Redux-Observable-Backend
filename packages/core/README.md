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

### `removeFilePathFromRequireCache`
When developing locally, removes the given `filePath` from Node.js's require cache.

This is especially useful when server-side rendering because you can reload the static HTML file built by Webpack (or similar) when loading it in Express (or similar).

#### Example
```js
removeFilePathFromRequireCache(
	'./build/serverSideRender.js'
)
```

#### Args

##### `filePath`
Path to the file for `require`. This path can be a module alias.

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
