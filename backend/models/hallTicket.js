import { DataTypes } from "sequelize";
import Student from "./students.js";
import Examination from "./examinations.js";
import sequelize from '../database.js';

const HallTicket = sequelize.define('HallTicket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: 'id'
      }
    },
    examination_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Examination,
        key: 'id'
      }
    },
    hallTicketData: {
      type: DataTypes.BLOB
    },
}, {
    timestamps: true,
    tableName: 'hall_ticket'
});

HallTicket.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
HallTicket.belongsTo(Examination, { foreignKey: 'examination_id', as: 'examination' });

export default HallTicket;