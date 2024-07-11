import React from 'react';

const StudentDashboard = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <ul>
        <li><a href="/student/submit-examination-form">Submit Examination Form</a></li>
        <li><a href="/student/download-hall-ticket">Download Hall Ticket</a></li>
      </ul>
    </div>
  );
};

export default StudentDashboard;