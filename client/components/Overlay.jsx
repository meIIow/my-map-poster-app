import React, { Component } from 'react';

const Overlay = (props) => {
  return (
      <div>
        <div id='overlay-shader'></div>
        <div id='overlay-wrapper'>
          Overlay, baby!
          <button class="tablinks" onClick={() => props.closeOverlay()}>
            Close Overlay
          </button>
        </div>
      </div>
  );
};

export default Overlay;
