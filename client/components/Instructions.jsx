import React, { Component } from 'react';

const Instructions = (props) => {
  return (
      <div>
        <h3> Step {props.stepNumber}: Select the {props.stepName}</h3>
        <div>{props.instructions}</div>
        <br/>
      </div>
  );
};

export default Instructions;
