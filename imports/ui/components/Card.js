import React from 'react';
import { Link } from 'react-router';

export const Card = (props) => {

  return (
    <div className="row">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{props.presenter}</span>
                  <h2>{props.studentName}</h2>
                </div>
              </div>
            </div>
          </div>
  );
};

export default Card;

