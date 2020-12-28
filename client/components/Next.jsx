import React, { Component } from 'react';

const NextButton = (props) => {
  const text = (!props.text) ? 'Next' : props.text;
  return (
      <div>
        <button class="tablinks" onClick={() => props.click()}>{text}</button>
      </div>
  );
};

export default NextButton;
