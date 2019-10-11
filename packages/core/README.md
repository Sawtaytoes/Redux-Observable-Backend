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

### createDeprecatedFunction
When developing locally, removes the given `filePath` from Node.js's require cache.

This is especially useful when server-side rendering because you can reload the static HTML file built by Webpack (or similar) when loading it in Express (or similar).

#### Example
```js
createDeprecatedFunction()
```

#### Args (Object)
This function returns a function that takes the same parameters as the function you've deprecated.

##### `deprecatedMethodName`
Function name being deprecated.

##### `func`
This is a function that converts the arguments of the deprecated function to the replacement function. This provides an automatic way forward and informs consumers with console logs when these deprecations occur. This way, they can convert to the newer function later, but current operations will still work as-intended.

##### `replacementMethodName`
Function name to use instead of the deprecated version. If the function has no replacement, leave this field blank.

---

### deprecateArgument
This function logs a message for any use of an argument when calling a function and provides an alternative argument to use instead. It's designed to be used by adding it to the top of your function before any business logic.

#### Example
```js
deprecateArgument()
```

#### Args (Object)

##### `deprecatedArgumentName`
A string representing the deprecated argument name.

##### `functionName`
A string representing the name of the function called with this deprecation.

##### `replacementArgumentName`
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

##### `filePath`
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

##### `defaultValue`
Returned when file doesn't exist.

##### `filePath`
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

##### `defaultValue`
`defaultValue` is returned when exception caught.

##### `finallyCallback`
Called when `finally` occurs.

##### `tryCallback`
Called when `try` occurs.
