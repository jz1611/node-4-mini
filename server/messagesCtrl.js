let allMessages = [];

module.exports = {
  getAllMessages: (req, res, next) => {
    res.status(200).send(allMessages);
  },

  createMessage: (req, res, next) => {
    const { username, message } = req.body;
    allMessages.push({username, message});

    if (req.session.history) {
      req.session.history.push({username, message});
    } else {
      req.session.history = [];
      req.session.history.push({username, message});
    }

    res.status(200).send(allMessages);
  },

  history: (req, res, next) => {
    res.status(200).send(req.session.history);
  }
}