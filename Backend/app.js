// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const dbConfig = require('./config/config.js');

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Database Connection
// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });

// connection.connect(error => {
//   if (error) throw error;
//   console.log("Connected to the MySQL database.");
// });

// global.connection = connection;

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const courseRoutes = require('./routes/courseRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const enrollmentRoutes = require('./routes/enrollmentRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/enrollments', enrollmentRoutes);

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
