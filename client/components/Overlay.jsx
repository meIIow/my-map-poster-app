import React, { Component } from 'react';

const Overlay = (props) => {
  return (
      <div>
        <div id='overlay-shader'></div>
        <div id='overlay-wrapper'>
          <button id="overlay-close" onClick={() => props.closeOverlay()}>
            Close
          </button>
          {props.overlayContent()}
        </div>
      </div>
  );
};

export default Overlay;
