const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); 
const Course = require('./Course'); 

const Enrollment = sequelize.define('Enrollment', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        references: {
            model: Course,
            key: 'id'
        }
    }
});

Enrollment.belongsTo(User, { foreignKey: 'userId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Enrollment;
