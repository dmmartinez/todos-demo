# ToDo's Demo

This is a small project for a todo management applications using:

- Vue 3
- Pinia
- Vite
- Axios

This is a demo project not suitable for production.

## TODO
- More unit and integration tests

## Global dependencies needed
- [yarn](https://yarnpkg.com)
- [json-server](https://github.com/typicode/json-server)
```
yarn global add json-server
```
- [concurrently](https://github.com/open-cli-tools/concurrently#readme)
```
yarn global add concurrently
```

## Project Setup

```
yarn install
```

### Compile and Hot-Reload for Development

```
yarn dev-mock-api
```

ToDo's in json-server are reset each run

### Type-Check, Compile and Minify for Production

```
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```
yarn lint
```
