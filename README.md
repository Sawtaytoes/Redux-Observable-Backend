# Redux Observable Backend
Redux-Observable-Backend is a framework of libraries used together to create entirely-Redux backend applications in Node.js.

All the functionality of these services is hidden behind Redux actions so from the perspective of someone consuming this library, you're writing regular JavaScript and all the Redux action happens behind-the-scenes.

## Table of Contents

- [Core](packages/core) - Helpful functions and utilities for any project.
- [Node](packages/node) - Node.js tooling for running a project with command line tasks and ESLint configurations.
- [Redux-Utils](packages/redux-utils) - A set of utility functions for working with Redux and Redux-Observable.
- [WebSocket](packages/websocket) - Building on the [Node](packages/node) package, WebSocket allows configuring WebSocket listeners within the Redux action system to communicate between machines.

## Why Redux?

The action syntax of Redux provides a structure like you'd find in Alan Kay's Message-Oriented Programming. Using Redux and Redux-Observable on the backend provides a completely different development paradigm which is beneficial for asynchronous code structures and microservices.

You can find out more about the message-oriented side of Redux in this Medium article I wrote: https://medium.com/@Sawtaytoes/redux-without-state-15e2f839055c.
