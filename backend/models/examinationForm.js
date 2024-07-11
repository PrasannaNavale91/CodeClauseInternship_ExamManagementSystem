import { DataTypes } from "sequelize";
import Student from "./students.js";
import Examination from "./examinations.js";
import sequelize from '../database.js';

const ExaminationForm = sequelize.define('ExaminationForm', {
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
    form_data: {
        type: DataTypes.TEXT
    },
    submittedAt: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    acceptedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'examination_form'
});

ExaminationForm.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
ExaminationForm.belongsTo(Examination, { foreignKey: 'examination_id', as: 'examination' });

export default ExaminationForm;