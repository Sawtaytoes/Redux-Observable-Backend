# Redux Observable Backend - Core
[What is this library?](https://github.com/Sawtaytoes/Redux-Observable-Backend/blob/master/README.md)

Helper functions for `Redux-Observable-Backend` packages. **These functions can be used in any project.** This package also provides uncaught exception logging.

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

### createDeprecatedFunction
When developing locally, removes the given `filePath` from Node.js's require cache.

This is especially useful when server-side rendering because you can reload the static HTML file built by Webpack (or similar) when loading it in Express (or similar).

#### Example
```js
createDeprecatedFunction()
```

#### Args _(object)_
This function returns a function that takes the same parameters as the function you've deprecated.

##### `deprecatedMethodName` _(string)_
Function name being deprecated.

##### `func` _(function)_
This is a function that converts the arguments of the deprecated function to the replacement function. This provides an automatic way forward and informs consumers with console logs when these deprecations occur. This way, they can convert to the newer function later, but current operations will still work as-intended.

##### `replacementMethodName` _(string)_
Function name to use instead of the deprecated version. If the function has no replacement, leave this field blank.

---

### deprecateArgument
This function logs a message for any use of an argument when calling a function and provides an alternative argument to use instead. It's designed to be used by adding it to the top of your function before any business logic.

#### Example
```js
deprecateArgument()
```

#### Args _(object)_

##### `deprecatedArgumentName` _(string)_
A string representing the deprecated argument name.

##### `functionName` _(string)_
A string representing the name of the function called with this deprecation.

##### `replacementArgumentName` _(string)_
A string representing the replacement argument name if any.

---

### removeFilePathFromRequireCache
When developing locally, removes the given `filePath` from Node.js's require cache.

This is especially useful when server-side rendering because you can reload the static HTML file built by Webpack (or similar) when loading it in Express (or similar).

#### Example
```js
removeFilePathFromRequireCache(
	'./build/serverSideRender.js'
)
```

#### Args

##### `filePath` _(string)_
Path to the file for `require`. This path can be a module alias.

---

### safeImport
Safely imports files with `require` syntax by allowing a `defaultValue` if the file doesn't exist or errors on load.

#### Example
```js
safeImport(
	defaultValue: [],
	filePath: './cache.json',
)
```

#### Args

##### `defaultValue` _(any)_
Returned when file doesn't exist.

##### `filePath` _(string)_
Path to the file for `require`. This path can be a module alias.

---

### tryCatchFinally
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

##### `defaultValue`  _(any)_
`defaultValue` is returned when exception caught.

##### `finallyCallback`  _(function)_
Called when `finally` occurs.

##### `tryCallback`  _(function)_
Called when `try` occurs.
