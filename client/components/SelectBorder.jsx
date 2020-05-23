import React, { Component } from 'react';
import Instructions from './Instructions.jsx';

const STEP_NAME = `Border`;
const INSTRUCTIONS = `Welcome! Start by choosing a general location for your map - then it's time to set the borders. Drag the map's frame to adjust the area your map contains, and drag on the map itself to change the center. You can lock a desired ratio to auto-snap the map to these dimensions after every change. Feel free to change the zoom level to get your whole map in frame - the actual zoom level of your final map will be determined by the resolution info you choose later. For now, just focus on capturing the area you would like your map to display!`;

const SelectBorder = (props) => {
  return (
    <div>
      <Instructions stepNumber={props.phase} stepName={STEP_NAME} instructions={INSTRUCTIONS}/>
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
