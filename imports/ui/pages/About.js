import React from 'react';

const About = () => (
  <div>
    <h1>About</h1>
    <div className="item">
      <p><strong>Name from the Happ</strong> is a simple application to help teachers organize and structure student presentations.</p>
      <h2>Instructions</h2>
      <ol>
        <li>Enter the class sections you teach.</li>
        <li>Enter the presentatons for that class section.</li>
        <li>Add the presenters for that class section.</li>
        <li>Navigate that presentation</li>
      </ol>

      <h2>Navigating Presentation Features</h2>
      <ul>
        <li>Random pick students to ensure fairness</li>
        <li>Skip students not ready</li>
        <li>Mark students absent</li>
        <li>Provide information of current presenter</li>
        <li>Show on deck presenter so they can be prepared</li>
        <li>Application informs you when all presentations are complete</li>
      </ul>
    </div>
  </div>
);

export default About;
