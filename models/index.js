// imports model definition from respective model files in the folder
const User = require("./user");
module.exports = User;

const { Model, DataTypes } = require("sequelize"); // imports sequelize instance from connection.js
const sequelize = require("../config/connect.js");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
