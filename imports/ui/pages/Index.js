import React from 'react';
import { Link } from 'react-router';

const Index = () => (
  <div className="wrapper">
      <h2>Create Random Presentations</h2>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
  </div>
);

export default Index;
