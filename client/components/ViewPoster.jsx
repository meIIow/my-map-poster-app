import React, { Component } from 'react';

const ViewPoster = (props) => {
  return (
    <div>
      <h3> Step {props.stepNumber}: View Map</h3>
      <div>Here's the poster image! Download it, then refresh to make another.</div>
      <br/>
      <div>
        <button class="tablinks" onClick={() => window.open(props.downloadUrl)}>Open in New Tab</button>
        <div></div>
        <a href={props.downloadUrl} download="poster-image.png">Download</a>
      </div>
    </div>
  );
}

export default ViewPoster;
