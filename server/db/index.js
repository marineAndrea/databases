// var mysql = require('mysql');
var Sequelize = require('Sequelize');
var sequelize = new Sequelize('chat', 'root', '');

var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Message = sequelize.define('Message', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

User.hasMany(Message);
Message.belongsTo(User);

User.sync();
Message.sync();

exports.User = User;
exports.Message = Message;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// SEQUELIZE SOLUTION



// BASIC MYSQL SOLUTION
// module.exports = mysql.createConnection({
//   user: "root",
//   password: "",
//   database: "chat"
// });