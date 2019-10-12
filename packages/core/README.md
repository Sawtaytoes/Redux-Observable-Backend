# Redux Observable Backend - Core
[What is this library?](https://github.com/Sawtaytoes/Redux-Observable-Backend/blob/master/README.md)

Helper functions for `Redux-Observable-Backend` packages. **These functions can be used in any project.** This package also provides uncaught exception logging.

## Installation
This package requires `rxjs` as a `peerDependency`.

### npm
```sh
npm i rxjs @redux-observable-backend/core
```

### yarn
```sh
yarn add rxjs @redux-observable-backend/core
```

## API Overview

### Functional Helpers
- [`tryCatchFinally`](#trycatchfinally)

### Import Mechanisms
- [`removeFilePathFromRequireCache`](#removefilepathfromrequirecache)
- [`safeImport`](#safeimport)

### Node.js Framework Helpers
- [`createDeprecationFunction`](#createDeprecationFunction)
- [`deprecateArgument`](#deprecateargument)
- [`logUncaughtExceptions`](#loguncaughtexceptions)

## API Docs

### createDeprecationFunction
When developing locally, removes the given `filePath` from Node.js's require cache.

This is especially useful when server-side rendering because you can reload the static HTML file built by Webpack (or similar) when loading it in Express (or similar).

#### Example
##### Deprecated function
```js
createDeprecationFunction({
	adapter: mapToState,
	deprecatedMethodName: 'mapToState',
})
```

##### Replaced function
```js
createDeprecationFunction({
	adapter: state => superMapToState({ state }),
	deprecatedMethodName: 'mapToState',
	replacementMethodName: 'superMapToState'
})
```

#### Args _(object)_
This function returns a function that takes the same parameters as the function you've deprecated.

##### `adapter` _(function)_
This is a function that converts the arguments of the deprecated function to the replacement function. This provides an automatic way forward and informs consumers with console logs when these deprecations occur. This way, they can convert to the newer function later, but current operations will still work as-intended.

##### `deprecatedMethodName` _(string)_
Function name being deprecated.

##### `replacementMethodName` _(string)_
Function name to use instead of the deprecated version. If the function has no replacement, leave this field blank.

---

### deprecateArgument
This function logs a message for any use of an argument when calling a function and provides an alternative argument to use instead. It's designed to be used by adding it to the top of your function before any business logic.

The intended purpose of `deprecateArgument` is when you have a function arg that changed or when it

If you need to convert from one argument to another, `deprecateArgument` doesn't handle this. That should be handled in your own code as it's specific to your situation.

#### Example
##### Deprecated argument
```js
deprecateArgument({
	deprecatedArgumentName: 'additionalDefaultConfigurationSet',
	methodName: 'createConfigurationSet',
})
```

##### Renamed argument
```js
deprecateArgument({
	deprecatedArgumentName: 'disabled',
	methodName: 'Button',
	replacementArgumentName: 'isDisabled',
})
```

##### Denote a type change
```js
deprecateArgument({
	deprecatedArgumentName: 'firstArg (string)',
	methodName: 'generateLink',
	replacementArgumentName: firstArg ({ href: '' (string), isActive: true (boolean) }),
})
```

#### Args _(object)_

##### `deprecatedArgumentName` _(string)_
A string representing the deprecated argument name.

##### `methodName` _(string)_
A string representing the name of the function called with this deprecation.

##### `replacementArgumentName` _(string)_
A string representing the replacement argument name if any.

---

### logUncaughtExceptions
Sometimes, Node.js applications can crash without error. To alleviate this problem, this logger catches uncaught exceptions and logs them before killing the application. This way, you're aware when an uncaught error's occurred.

#### Example
```js
logUncaughtExceptions()
```

#### Args

N/A

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
safeImport({
	defaultValue: [],
	filePath: './cache.json',
})
```

#### Args _(object)_

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

#### Args _(object)_

##### `defaultValue`  _(any)_
`defaultValue` is returned when exception caught.

##### `finallyCallback`  _(function)_
Called when `finally` occurs.

##### `tryCallback`  _(function)_
Called when `try` occurs.
