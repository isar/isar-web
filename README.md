The web bindings for the Isar database, a multi-platform, type-safe abstraction over native
capabilities. See https://isar.dev for more info.

This project is a stub currently; any code it may have is likely dysfunctional, untested, or
both. 

This currently uses TypeScript as its primary language, ESLint for linting, and [ava](https://avajs.dev) for testing. There is configuration files present in the repository for each of these tools. 

To run tests, use `npm t` or `npm run test`; this builds the out directory and runs unit tests off it. To just build the library, use `npm run build`.

This project currently uses an in-memory fake of IndexedDB for unit testing. At some point, this will be amended to a Selenium configuration for more complete error coverage.