import express from 'express';
import sequelize from './database.js';
import Admin from './models/admin.js';
import Student from './models/students.js';
import Examination from './models/examinations.js';
import StudentGroup from './models/studentGroups.js';
import ExaminationForm from './models/examinationForm.js';
import HallTicket from './models/hallTicket.js';
import bcrypt from 'bcryptjs'
const app = express();

const models = {
  Admin,
  Student,
  Examination,
  StudentGroup,
  ExaminationForm,
  HallTicket,
};

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

// Define API routes
app.use(express.json());

// Admin authentication middleware
function isAdmin(req, res, next) {
  if (req.headers.authorization !== 'Bearer admin_token') {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  next();
}

// Student authentication middleware
function isStudent(req, res, next) {
  const student_id = req.headers.authorization.split(' ')[1].split('_')[1];
  if (!student_id) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  req.studentId = student_id;
  next();
}

app.post('/api/register', async (req, res) => {
  const { name, email, username, password, role, rollNumber } = req.body;
  try {
    if (role === 'admin') {
      const isEmail = await Admin.findOne({ email });
      if(isEmail){
        return res.status(400).send({ message: 'Email already registered' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.create({ name, username, password: hashedPassword, email });
      res.send({ message: 'Admin registered successfully' });
    } else if (role === 'student') {
      if (!rollNumber) {
        return res.status(400).send({ message: 'Roll number is required for students' });
      }

      const isEmail = await Student.findOne({ email });
      if(isEmail){
        return res.status(400).send({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await Student.create({ name, rollNumber, email, username, password: hashedPassword });
      res.send({ message: 'Student registered successfully' });
    } else {
      res.status(400).send({ message: 'Invalid role' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error registering user' });
  }
});

// Admin API routes
app.post('/api/login', async (req, res) => {
  const { role, username, password } = req.body;

  if (!username || !password || !role) {
    return res.status(400).send({ message: 'Please provide username, password, and role.' });
  }

  try {
    if (role === 'admin') {
      const admin = await Admin.findOne({ where: { username, password } });
      if (!admin) {
        return res.status(401).send({ message: 'Invalid username or password' });
      } else {
        res.send({ message: 'Logged in successfully', role });
      }
    } else if (role === 'student') {
      const student = await Student.findOne({ where: { username, password } });
      if (!student) {
        return res.status(401).send({ message: 'Invalid username or password' });
      } else {
        res.send({ message: 'Logged in successfully', role });
      }
    } else {
      res.status(400).send({ message: 'Invalid role' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error logging in' });
  }
});

app.post('/api/admin/addStudent', isAdmin, async (req, res) => {
  const { name, rollNumber, email, password } = req.body;
  try {
    await models.Student.create({ name, roll_number: rollNumber, email, password });
    res.send({ message: 'Student added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error adding student' });
  }
});

app.post('/api/admin/createExamination', isAdmin, async (req, res) => {
  const { name, date, time, venue } = req.body;
  try {
    await models.Examination.create({ name, date, time, venue });
    res.send({ message: 'Examination created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating examination' });
  }
});

app.post('/api/admin/addStudentGroup', isAdmin, async (req, res) => {
  const { examinationId, studentId } = req.body;
  try {
    await models.StudentGroup.create({ examination_id: examinationId, student_id: studentId });
    res.send({ message: 'Student group added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error adding student group' });
  }
});

app.post('/api/student/submitExaminationForm', isStudent, async (req, res) => {
  const { studentId, examinationId, formData } = req.body;
  try {
    await models.ExaminationForm.create({ student_id: studentId, examination_id: examinationId, form_data: formData });
    res.send({ message: 'Examination form submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error submitting examination form' });
  }
});

app.get('/api/student/downloadHallTicket', isStudent, async (req, res) => {
  const { studentId, examinationId } = req.query;
  try {
    const hallTicket = await models.HallTicket.findOne({ where: { student_id: studentId, examination_id: examinationId } });
    if (!hallTicket) {
      return res.status(404).send({ message: 'Hall ticket not found' });
    }
    const hallTicketData = hallTicket.hall_ticket_data;
    res.setHeader('Content-Disposition', 'attachment; filename=hall_ticket.pdf');
    res.send(hallTicketData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error downloading hall ticket' });
  }
});

app.post('/api/logout', (req, res) => {
  res.send({ message: 'Logged out successfully' });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});