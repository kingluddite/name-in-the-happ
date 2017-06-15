import React from 'react';
import { Link } from 'react-router';

export const Breadcrumbs = (props) => {

  return (
    <div>
      <ul className="crouton">
        <li><Link to="/sections">Sections</Link></li>
        <li><Link to="/sections/id/presentations">Presentations</Link></li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
