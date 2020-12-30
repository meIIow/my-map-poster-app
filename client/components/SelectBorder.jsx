import React, { Component } from 'react';

const SelectBorder = (props) => {
  return (
    <div>
      <h3> Step {props.stepNumber}: Map Area </h3>
      <br/>
      <div>
        <button class="importantButton" onClick={() => props.expandInstructions()}>Instructions</button>
      </div>
      <br/>
      <input id="pac-input" type="text" placeholder="Enter a location"></input>
      <input id="re-center" type="button" value="Re-Center Map"></input>
      <div>width:</div>
      <input type="number" id="width" min="1" value={props.ratio.width} onInput={(event) => {props.updateRatio(event.target.value, false)}}></input>
      <div>height:</div>
      <input type="number" id="height" min="1" value={props.ratio.height} onInput={(event) => {props.updateRatio(false, event.target.value)}}></input>
      <div>Snap to Ratio:</div>
      <label class="switch">
        <input id="lock-ratio" type="checkbox" value = {props.lock} onClick={() => props.toggleRatioLock()}></input>
        <span class="slider round"></span>
      </label>
    </div>
  );
}

export default SelectBorder;
