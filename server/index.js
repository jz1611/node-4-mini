require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const { getAllMessages, createMessage, history } = require('./messagesCtrl')

app.use(express.json());

const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

app.use((req, res, next) => {
  let badWords = ['idiot'];
  if (req.body.message) {
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], 'g');
      req.body.message = req.body.message.replace(regex, '****');
    }
    next();
  } else {
    next();
  }
})

app.get('/api/messages', getAllMessages);
app.post('/api/message', createMessage);
app.get('/api/messages/history', history);

const port = SERVER_PORT || 3005;
app.listen(port, () => console.log(`Server listening on port ${port}...`));