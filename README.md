# MERN Chat application

![](./public/node-code-school.gif)

[Video of how it works](https://drive.google.com/file/d/135UqEBBaYEAnEh8SF_b88KZvAVrzsUah/view?usp=sharing)

Basic MERN (Mongo + Express + React + Node.JS) application.

Includes:
- Authentication route providing [Session](https://expressjs.com/en/resources/middleware/session.html)
- Routes for managing conversation, message and users
- Real-time messaging - [Socket.io](https://socket.io/)

# Summary

For this project, firstly I need to find best model of folder structure for MERN application. 

### Server folder
- **Controllers:** Organize route handlers and logic that handle HTTP requests
- **Errors:** Define API error
- **Middleware:** Implement middleware functions for tasks
- **Models:** Define data model 
- **Router:** Define API endpoints
- **Utils:** Utility functions or modules used across applications like connection to database
- **`.gitignore`:** File used to mention the modules which will be ignored by GIT
- **`.env`:** Store environment variables
- **`server.js`:** Starting point of application

**Environment**

For require environment variable in application, I use [dotenv](https://www.npmjs.com/package/dotenv) package that I need to invoke in `server.js` file.

```javascript
require("dotenv").config();
```

```bash
MONGO_URI=mongo_connection
SECRET_SESSION_KEY=random_session_secret_key
SECRET_SESSION_NAME=sessionId
```

For generate random session secret key I run this command in terminal

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

```

**Errors**

Creating custom errors allows for more meaningful error messages. I developed a CustomAPIError class that accepts a message as an argument. This class is extended in various files, such as bad-request.js, utilizing the [http-status-codes](https://www.npmjs.com/package/http-status-codes) package to assign appropriate status codes. I also install [express-async-errors](https://www.npmjs.com/package/express-async-errors) package for handle async error in Express.

```javascript
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomAPIError;
```

**Modeles**

I create four models file in models folder that are mongoose schema for creating database table.
- **Conversation** - mongoose schema for conversation
- **ConversationMessage** - mongoose schema for storing message based by conversation
- **Message** - mongoose schema for message
- **User** - mongoose schema for users where I use [bcryptjs](https://www.npmjs.com/package/bcryptjs) package for password hashing

**Middleware**
- `authentication.js` - Check if session exist and enable some routes if exists
- `error-handler.js` - Return to page based by error
- `not-found.js` - Return to not found page(404) page

**Routes**

In this project, I defined routes for get messages from each conversation, protected by authentication middleware. This middleware ensure users can only access routes. In the router folder, I set up endpoints and CRUD operations, invoking functions from controllers to handle GET, POST, PUT, and DELETE requests.

### Client folder

For this project, I utilized a React template that I created, incorporating a well-organized SCSS structure where each component has its folder.

**TypeScript Integration**

I created TypeScript types for the data based on [Node Models](https://github.com/Roko03/chat-application/tree/main/server/models).

**Design and Styling**

I defined typography for the project using two Google Fonts: Poppins and Roboto.

## Challenges and Solutions

The most challenging part of the project was implementing [Socket.io](https://socket.io/docs/v4/) in application. Firstly, I implement socket in backend and enable CORS.
```javascript
const http = require("http");
const server_app = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server_app, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  },
});
```
After, we set when is socket connected to check which conversationId is in socket and store it in object called `socketConversation` and join in room with that conversationId.

```javascript
io.on("connection", (socket) => {
  const conversationId = socket.handshake.query.conversationId;
  if (conversationId != undefined) {
    socketConversation[conversationId] =
      socketConversation[conversationId] || [];
    socketConversation[conversationId].push(socket.id);
    socket.join(conversationId);
  }
});
```
In frontend, we create socket context where we have functionality for socket. 
We define socket and conversationId in state
```javascript
const [socket, setSocket] = useState<Socket | null>(null);
const [conversationId, setConversationId] = useState<string | null>(null);
```
We set conversation in socket query where we via backend joined to that room
```javascript
useEffect(() => {
    if (isAuth && user && conversationId) {
      const socket = io("http://localhost:3000/", {
        query: {
          conversationId: conversationId,
        },
      });
      setSocket(socket);
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
}, [isAuth, user, conversationId]);
```
Also, when we want to leave that conversation, we need to disconnect from that room
```javascript
socket.on("disconnect", () => {
    if (conversationId != undefined) {
      socketConversation[conversationId] = socketConversation[
        conversationId
      ].filter((id) => id !== socket.id);
      if (socketConversation[conversationId].length === 0)
        delete socketConversation[conversationId];
    }
});
```

# Project Structure
- **Folders and Files:** The project follows modular structure for folder with the model-view-controller pattern
- **Technologies Used:** Node.js, Express.js, React.js, SCSS, TypeScript
- **CRUD operations:** Four basic operations(Create, Read, Update, Delete)
- **Database:** The project is connected with [MongoDB](https://www.mongodb.com/) and use Object Data Modeling(ODM) library [Mongoose](https://mongoosejs.com/)
- **Session authorization:** The project features an authorization system using session token that is stored in database
- **React Hook Form:** Remove unnecessary re-renders and validate forms 
- **Zod:** TypeScript validation schema
- **Considerations:** The main focus of this project was to understand how to implement socket in application and how session works.

## Time Spent

I need 50-80 hours of work to make this project.

# How to Use
Make sure you have the following installed on your computer:

- [git](https://git-scm.com/)
- [node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

Clone the repository

```bash
git clone https://github.com/Roko03/chat-application.git
```
Running the backend
```bash
cd server
npm install
npm run dev
```

Running the fronend
```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the frontend and open [http://localhost:3000](http://localhost:3000) to see backend
