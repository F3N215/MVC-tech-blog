const { Model, DataTypes } = require("sequelize"); // imports sequelize instance from connection.js
const sequelize = require("../config/connection.js"); // imports connection.js
const bcrypt = require("bcrypt"); // imports bcrypt package

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password); // compares entered password with hashed password
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        // before creating a new user, hash the password
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updateUserData) {
        updateUserData.password = await bcrypt.hash(
          updateUserData.password,
          10
        );
        return updateUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
