var models = require('../models');
var bluebird = require('bluebird');
var utils = require('../utils.js');


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(results) {
        utils.sendResponse(res, {results: results}); // client is expecting an object of this type
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var data = req.body;
      data.createdAt = new Date().toISOString();
      models.messages.post(data, function(err) {
        if (err) {
          utils.sendResponse(res, "internal server error", 500);
        } else {
          utils.sendResponse(res, null, 201);
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(results) {
        utils.sendResponse(res, results);
      });
    },
    post: function (req, res) {
      var data = req.body;
      models.users.post(data, function(err) {
        if (err) {
          utils.sendResponse(res, "internal server error", 500);
        } else {
          utils.sendResponse(res, null, 201);
        }
      });
    }
  }
};

