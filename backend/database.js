import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('exam_managment', 'root', '123456789', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;