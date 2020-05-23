import React, { Component } from 'react';
import Instructions from './Instructions.jsx';

const STEP_NAME = `Size`;
const INSTRUCTIONS = `Next, choose the (minimum) size of your map. Either enter Pixel dimension direcectly, or specify the dimensions in units and choose a pixel density.`;

const SelectSize = (props) => {
  return (
    <div>
      <Instructions stepNumber={props.phase} stepName={STEP_NAME} instructions={INSTRUCTIONS}/>
      <div class="tab">
        <button class={`tablinks${props.withUnits ? ' active' : ''}`} onClick={() => props.setWithUnits(true)}>Units & Resolution</button>
        <button class={`tablinks${!props.withUnits ? ' active' : ''}`} onClick={() => props.setWithUnits(false)}>Pixel Dimensions</button>
      </div>
      <div>
        <div class="halfsies">width units:
          <input type="number" disabled={!props.withUnits} class="units" id="width-units" min="0" onInput={(e)=> props.setUnits(e.target.value, null)} value={(props.lock) ? props.ratio.width * props.mult.ratio : props.dimensions.x * props.mult.dimensions / props.resolution}></input>
        </div>
        <div class="halfsies">height units:
          <input type="number" disabled={!props.withUnits} class="units" id="height-units" min="0" onInput={(e)=> this.setUnits(null, e.target.value)} value={(props.lock) ? props.ratio.height * props.mult.ratio : props.dimensions.y * props.mult.dimensions / props.resolution}></input>
        </div>
        <div>Pixel Density:<input type="number" disabled={!props.withUnits} value={props.resolution} min="0" step="50" onInput={(e)=> this.updateResolution(e.target.value)}></input></div>
      </div>
      <div>width-pixels:</div>
      <input type="number" disabled={props.withUnits} id="width-pixels" min="1" value={Math.round((props.lock) ? props.ratio.width * props.mult.ratio  * props.resolution : props.dimensions.x * props.mult.dimensions)} onInput={(e)=> this.updatePixels(e.target.value, null)}></input>
      <div>height-pixels:</div>
      <input type="number" disabled={props.withUnits} id="height-pixels" min="1" value={Math.round((props.lock) ? props.ratio.height * props.mult.ratio * props.resolution : props.dimensions.y * props.mult.dimensions)} onInput={(e)=> this.updatePixels(null, e.target.value)}></input>
    </div>
  );
}

export default SelectSize;
