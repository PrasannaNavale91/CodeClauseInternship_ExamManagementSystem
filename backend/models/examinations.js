import { DataTypes } from "sequelize";
import sequelize from '../database.js';

const Examination = sequelize.define('Examination', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  venue: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
}, {
  timestamps: true,
  tableName: 'examinations'
});

export default Examination;