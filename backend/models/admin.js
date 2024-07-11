import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
}, {
  timestamps: true,
  tableName: 'admin'
});

export default Admin;