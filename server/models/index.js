var db = require('../db');




module.exports = {
  messages: {
    get: function (callback) {
      var queryString = "SELECT messages.ID, users.username, messages.text, messages.roomname, messages.createdAt \
                        FROM messages, users WHERE messages.userID = users.ID;";
      // sends a query to the database and executes a callback when the query return
      db.query(queryString, function(err, results) {
        if (err) {
          throw err;
        } else {
          // send the results back to controllers
          // wait for query to have finished and return results
          callback(results);
        }
      });
    }, // a function which produces all the messages
    post: function (data, callback) {
      // check if in users table there is name that corresponds to data.username

      var queryString = "SELECT ID FROM users WHERE username = ?;"
      var queryArgs = [data.username];

      db.query(queryString, queryArgs, function(err, results) {
        if (err) {
          callback(err);
        } else {
          if (results.length === 0) {
            // add username to users table
            queryString = "INSERT INTO users \
                            (username) \
                            values (?);";
            queryArgs = [data.username];
            db.query(queryString, queryArgs, function(err) {
              if (err) {
                callback(err);
              } else {
                // get the id of the user that was just inserted
                db.query("SELECT LAST_INSERT_ID();", function(err, results) {
                  if (err) {
                    callback(err);
                  } else {
                    var userID = results[0]['LAST_INSERT_ID()'];
                    queryString = "INSERT INTO messages \
                                    (userID, text, roomname, createdAt) \
                                    values (?, ?, ?, ?);";
                    queryArgs = [userID, data.text, data.roomname, data.createdAt];
                    db.query(queryString, queryArgs, function(err, results) {
                      callback(err);
                    });
                  }
                });
              }
            });
          } else { // if username already exists
            // insert message into messages
            var userID = results[0].ID;
            queryString = "INSERT INTO messages \
                            (userID, text, roomname, createdAt) \
                            values (?, ?, ?, ?);";
            queryArgs = [userID, data.text, data.roomname, data.createdAt];
            db.query(queryString, queryArgs, function(err, results) {
              callback(err);
            });
          }
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var queryString = "SELECT * FROM users;";
      // sends a query to the database and executes a callback when the query return
      db.query(queryString, function(err, results) {
        if (err) {
          throw err;
        } else {
          // send the results back to controllers
          // wait for query to have finished and return results
          callback(results);
        }
      });
    },
    post: function (data, callback) {
      var queryString = "SELECT ID FROM users WHERE username = ?;"
      var queryArgs = [data.username];

      db.query(queryString, queryArgs, function(err, results) {
        if (err) {
          callback(err);
        } else {
          if (results.length === 0) {
            // add username to users table
            queryString = "INSERT INTO users \
                            (username) \
                            values (?);";
            queryArgs = [data.username];
            db.query(queryString, queryArgs, function(err) {
              callback(err);
            });
          } else { // if username already exists
            callback(err);
          }
        }
      });
    }
  }
};

