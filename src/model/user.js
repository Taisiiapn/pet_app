const {user_role} = require("../config/constants");
const { ROLE_ADMIN, ROLE_MODERATOR, ROLE_EMPLOYEE } = user_role
const sequelize = require('../syncDB');
const { DataTypes } = require('sequelize');


const userAuthTokenDTO = (userInstance) => {
  return {
    fullName:userInstance.get('fullName'),
    id: userInstance.get('id'),
    password: userInstance.get('password'),
    role: userInstance.get('role'),
    departmentid: userInstance.get('departmentid'),
  }
}

const userDTO = (userInstance) => {
  return {
    firstName: userInstance.get('firstName'),
    lastName: userInstance.get('lastName'),
    salary: userInstance.get('salary'),
    birthday: userInstance.get('birthday'),
    email: userInstance.get('email'),
    id: userInstance.get('id'),
    password: userInstance.get('password'),
    role: userInstance.get('role'),
    departmentid: userInstance.get('departmentid')
  }
}

const createdUserDTO = (userInstance) => {
  return {
    id: userInstance.get('id')
  }
}

const userFullDTO = (userInstance) => {
  return {
    firstName: userInstance.get('firstName'),
    lastName: userInstance.get('lastName'),
    salary: userInstance.get('salary'),
    birthday: userInstance.get('birthday'),
    email: userInstance.get('email'),
    id: userInstance.get('id'),
    createdAt: userInstance.get('createdAt'),
    updatedAt: userInstance.get('updatedAt')
  }
}

const User = (DataTypes, sequelize) => {

  sequelize.define('User', 
    {

      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },

      firstName: {
        type: DataTypes.STRING,
        field: 'firstname'
      },

      lastName: {
        type: DataTypes.STRING,
        field: 'lastname'
      },

      salary: {
        type: DataTypes.INTEGER
      },

      departmentid: {
        type: DataTypes.UUID,
        allowNull: true
      },

      birthday: {
        type: DataTypes.STRING
      },

      email: {
        type: DataTypes.STRING
      },

      password: {
        type: DataTypes.STRING
      },

      role: {
        type: DataTypes.ENUM(ROLE_ADMIN, ROLE_MODERATOR, ROLE_EMPLOYEE)
      },
    
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdat'
      },

      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedat'
      },

      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
          return rawValue ? rawValue : null;
        }
      }
    },

    {
      sequelize: sequelize,
      freezeTableName: true,
      tableName: 'user'
    }
  )
};


module.exports = {
  User,
  userAuthTokenDTO,
  userFullDTO,
  userDTO,
  createdUserDTO
}