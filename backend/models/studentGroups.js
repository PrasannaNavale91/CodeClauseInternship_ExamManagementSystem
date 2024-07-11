import { DataTypes} from 'sequelize';
import Student from './students.js';
import Examination from './examinations.js';
import sequelize from '../database.js';

const StudentGroup = sequelize.define('StudentGroup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  examination_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Examination,
      key: 'id'
    }
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'id'
    }
  },
}, {
  timestamps: true,
  tableName: 'student_groups'
});

StudentGroup.belongsTo(Student, { foreignKey: 'student_id', as: 'students' });
StudentGroup.belongsTo(Examination, { foreignKey: 'examination_id', as: 'examinations' });

export default StudentGroup;