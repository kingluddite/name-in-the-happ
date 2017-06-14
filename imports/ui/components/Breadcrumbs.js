import React from 'react';
import { Link } from 'react-router';

export const Breadcrumbs = (props) => {

  return (
    <div>
      <ul className="crouton">
      <li><Link to="/sections">Sections</Link></li>
      {props.params.presentationId ? <li><Link to="/presentations">Presentations</Link></li> : undefined}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
