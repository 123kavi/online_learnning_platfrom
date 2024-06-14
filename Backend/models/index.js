const User = require('./User');
const Course = require('./Course');
const Enrollment = require('./Enrollment');

// Define associations
User.hasMany(Enrollment, { foreignKey: 'userId' });
Enrollment.belongsTo(User, { foreignKey: 'userId' });

Course.hasMany(Enrollment, { foreignKey: 'courseId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = { User, Course, Enrollment };
