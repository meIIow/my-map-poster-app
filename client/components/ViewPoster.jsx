import React, { Component } from 'react';
import Instructions from './Instructions.jsx';

const STEP_NAME = `View`;
const INSTRUCTIONS = `Just look at it or whatever`;

const ViewPoster = (props) => {
  return (
    <div>
      <Instructions stepNumber={props.phase} stepName={STEP_NAME} instructions={INSTRUCTIONS}/>
      <div>
        <button class="tablinks" onClick={() => window.open(props.downloadUrl)}>Tab It!</button>
        <div></div>
        <a href={props.downloadUrl} download="poster-image.png">Download</a>
      </div>
    </div>
  );
}

export default ViewPoster;
