# React Github API

## Getting start
You can choose between ``npm`` or ``yarn`` to run the project. This doc is going to use ``yarn``.

To install all the dependencies:
```
yarn install
```

Run the project:
```
yarn start
```

Run the tests:
```
yarn test
```

Run storybook:
```
yarn run storybook
```

## Why this stack?

You might ask, after seeing the code, why this folders architecture and these libs? Well, perhaps it can be a base of a big project, so it is better to start right.

Is listed below a bit more about it.

### 1. ES6
Nowadays all the docs and good stuffs in javascript is in ES6. Why I like it? Arrow functions and async await are good examples.

### 2. Redux
For a state management the project is running with ``redux``. It has a powerful way to control the global state. It is scalable, for small projects it might be a little bit over engineer, but if your project starts to get bigger, you won't get a problem. Therefore, to handle requests it is running with ``redux-thunk``.

### 3. Styled-components
Personally, at the beginning I didn't like css-in-js so much. After I a try with ``styled-components``, the game changed and now I am a big fan of css-in-js.

### 4. Storybook
Components are documented using ``storybook``, it has a good view of the components and has no problem with ``styled-components`` ``ThemeProvide``.

### 5. Jest
Unit tests are running with ``jest``, as it is a simple way to write tests and already comes with ``create-react-app``.

## What is next?

There are a few things that could be great to have the project. It would be great to have some e2e tests, to guarantee that all the users see,
is properly tested. Therefore, it gives to the developer a secure that his code is going to prod without breaking anything.

Server side rendering also would be great to have, as it is good for SEO and performance, for example.
