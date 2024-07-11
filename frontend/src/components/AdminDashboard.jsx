import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><a href="/admin/add-student">Add Student</a></li>
        <li><a href="/admin/create-examination">Create Examination</a></li>
        <li><a href="/admin/manage-student-groups">Manage Student Groups</a></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;