# Co-Op Shop
**Shared Real-time Grocery List**

## About
Imagine you have a 4-person family, and each of you has a smart-phone with the web application running. When you arrive at the grocery store, you split up to shop individually. This allows the groceries to be acquired in the fastest possible way. Each person has the same grocery list on their phone. When one of you checks a grocery item off the shared list, it updates on everyone else’s list, preventing anyone from purchasing duplicate items. Similarly, items added to the list on any phone update to the same list.

### Requirements
Create a grocery list web-application that can be shared in real-time by multiple people.

1. Save, Update, and Delete items to/from a database of your choosing.
2. Authenticate users - allowing the same user to be signed in from multiple devices.
3. Allow add, edit, delete, “mark as purchased”, and “unmark as purchased” on each item.
4. Keep the list synced in real time from each device.
5. Accompany your code with a full test suite.
6. Deploy your site to a web host (e.g., on Amazon EC2, Heroku, Netlify, Google AppEngine, etc.).

The architecture must be split between a back-end and a web front-end, for instance, providing an in/out RESTful API in JSON. Feel free to use any other technologies, provided that the general client/service architecture is respected.

### Solution

Co-op Shop!

Below are the different libraries that I decided to use to solve this problem.  I was not familiar with everything used, so there was a bit of learning curve involved.  There are other minor dependcies that are used, but those are not listed below.

**Front-End**

- Typescript
- Create React App
- Material UI
- React Router
- Redux
- Redux Thunk
- React Redux
- Redux Form
- JWT Decode
- Socket.io

**Back-End**

- Typescript
- Node.js
- Express
- Type ORM w/ Postgres
- JSON Web Token
- Socket.io

**Testing**

- Cypress

**Deployment**

- Heroku

### Reasoning

**Front-End**

React is a frontend framework that I am very familiar with.  Material UI provided me with a list of different components that are styled to conform with material ui specifications.  It also provides a great solution for managing CSS in JS.  State management was a big concern for me and I wanted to build the app with future considerations in mind.  Redux was a great solution and has a simple way to connect with react.  Using sockets, I was able to broadcast redux actions from the server through websockets.

**Back-End**

One of the core requirements was to create a split back-end and front-end project.  For this I created an RESTful API using Node.js and Express.  I wanted to learn a new ORM and Typescript.  TypeORM fit the bill perfectly.  I needed a way to broadcast information from the server to the client.  Socket.io was a great solution for this problem.  Authentication was a requirement accross multiple devices using a REST API.  After researching the problem, JSON web tokens provided a great way to authenticate users.

**Testing**

Cypress allowed me to write tests that fueled development.

## Deployment

The website was deployed on heroku at https://co-op-shop.herokuapp.com/.

Feel free to create a new user or choose from one of the following:

- user@test.com
- user1@test.com
- user2@test.com

All passwords are **test**

## Installation

**Setup**

- Run `npm install` in the root directory.
- Run `npm install` in the client directory.
- Create a postgres database named `co-op-shop`.

To run the backend locally run `npm run dev` in the root directory.
- Visit the site at http://localhost:3000.

To run the frontend locally run `npm start` in the client directory.

To run the built app locally run `npm run test-server`. 
- Visit the site at http://localhost:5000.

To run all tests with cypress you have to do the following:
- Start a server with `npm run test-server` in the root directory.
- Run `npm test` in the root directory.

There is a bug with cypress/create-react-app/socket.io that would make tests randomly timeout if testing against the non built site.  This is why the above steps are necessary instead of just testing against the dev client and server.

## Author

Created by Josh Kay
