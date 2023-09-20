# Money Tracker (in progress)

This is a fully responsive MERN stack app to track your money.

## Table of contents

- [Overview](#overview)
  - [Screenshots](#screenshots)
  - [Links](#links)
  - [Features](#features)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### Screenshots

<kbd>
  <img src="https://ishantbhurani.github.io/money-tracker-mern/screenshots/login.png" alt='Login page'>
</kbd>

<kbd>
  <img src="https://ishantbhurani.github.io/money-tracker-mern/screenshots/register.png" alt='Register new user'>
</kbd>

<kbd>
  <img src="https://ishantbhurani.github.io/money-tracker-mern/screenshots/desktop-transactions.png" alt='Transactions (Desktop)'>
</kbd>

<kbd>
  <img src="https://ishantbhurani.github.io/money-tracker-mern/screenshots/mobile-transactions.png" alt='Transactions (Mobile)'>
</kbd>

### Links

- Live Site URL: [https://money-tracker-client.netlify.app/](https://money-tracker-client.netlify.app/)

### Features

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Register for a new account using name, email, and password
- Log in using email and password
- Log out
- If there are no expenses, see a button to add a new expense
- See a table (with fields - date, title, description, amount, balance, and actions) of their expenses in descending order
- See the loading animation
- Click with a floating action button to add a new expense
- See the new expense modal
- Add a new expense
- Edit an existing expense in the modal
- Delete an expense

## My process

### Built with

#### Frontend

- [React](https://reactjs.org/) - JavaScript library
- [TypeScript](https://www.typescriptlang.org/) - Syntactic superset of JavaScript
- [Vite](https://vitejs.dev/) - Build tool, dev server
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [prettier-plugin-tailwindcss](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) - Automatic Tailwind CSS class sorting with Prettier
- [React Router](https://reactrouter.com/) - Routing for React
- [React Redux](https://react-redux.js.org/) - Official React bindings for Redux (A predictable state management library)
- [Redux Toolkit](https://redux-toolkit.js.org/) - Official toolset for Redux development
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - Powerful data fetching and caching tool included in the Redux Toolkit
- [clsx](https://github.com/lukeed/clsx) - utility for constructing `className` strings conditionally
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind CSS classes without style conflicts
- [react-icons](https://react-icons.github.io/react-icons) - Library to include popular icons in React

#### Backend

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Express](https://expressjs.com/) - Node.js web framework
- [TypeScript](https://www.typescriptlang.org/) - Syntactic superset of JavaScript
- [cors](https://github.com/expressjs/cors) - Node.js CORS middleware
- [cookie-parser](https://github.com/expressjs/cookie-parser) - Parse HTTP request cookies
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [Mongoose](https://mongoosejs.com/) - ODM library for MongoDB
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - bcrypt (a password-hashing function) for Node.js
- [express-async-handler](https://github.com/Abazhenov/express-async-handler) - Async Error Handling Middleware for Express
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JSON Web Tokens implementation for Node.js
- [nodemon](https://nodemon.io/) - automatically restarts Node.js server when change detected
- [ts-node](https://typestrong.org/ts-node/) - TypeScript execution engine for Node.js

### Useful resources

- [MERN Auth](https://github.com/bradtraversy/mern-auth) by [Brad Traversy](https://twitter.com/traversymedia)
- [MERN Stack](https://github.com/gitdagray/mern_stack_course) by [Dave Gray](https://twitter.com/yesdavidgray)

## Author

- Twitter - [@IShaunt](https://twitter.com/IShaunt)
- Portfolio - [Ishant Bhurani](https://ishant.netlify.app/)
