const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phoneNumber: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'phone_number',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

}

class Customer extends Model {

  static assocciate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Order, { as: 'orders', foreignKey: 'customerId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: true,
      hooks: {
        beforeCreate: (user) => {
          user.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
          user.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        },
        beforeUpdate: (user) => {
          user.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        }
      }
    }
  }
}

module.exports = {
  CUSTOMER_TABLE,
  CustomerSchema,
  Customer
};
