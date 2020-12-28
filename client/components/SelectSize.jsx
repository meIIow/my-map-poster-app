import React, { Component } from 'react';

const units = ['Inches', 'Feet', 'cm', 'Meters', 'Other', 'Pixels'];
const unitTypeToName = (unit) => unit === 'other' ? 'units' : unit;

const SelectSize = (props) => {

  const unitOptions = units.map((unit) => {
    return <option value={unit} selected={unit === props.unit}>{unit}</option>
  });

  const densityAndPixelInfo = (props.unit === 'Pixels') ?
    <div/> :
    <div>
      <div>Pixels per (?) {props.unit}:
        <input type="number" value={props.resolution} min="0" step="50" onInput={(e)=> props.updateResolution(e.target.value)}>
        </input>
      </div>
      <div>Pixels Wide (min): {Math.ceil(props.getUnits().x * props.resolution)}</div>
      <div>Pixels Tall (min):  {Math.ceil(props.getUnits().y * props.resolution)}</div>
    </div>;

  return (
    <div>
      <h3> Step {props.stepNumber}: Map Resolution </h3>
      <br/>
      <div>
        <button class="importantButton" onClick={() => props.expandInstructions()}>Instructions</button>
      </div>
      <div>
        <div>
          <select name="units" id="unitSelect" onChange={(e) => props.updateUnitType(e.target.value)}>
            {unitOptions}
          </select>
        </div>
        <div class="halfsies">{props.unit} wide:
          <input type="number" class="units" id="width-units" min="0" onInput={(e)=> props.setUnits(e.target.value, null)} value={props.getUnits().x}></input>
        </div>
        <div class="halfsies">{props.unit} tall:
          <input type="number" class="units" id="height-units" min="0" onInput={(e)=> props.setUnits(null, e.target.value)} value={props.getUnits().y}></input>
        </div>
        {densityAndPixelInfo}
      </div>
    </div>
  );
}

export default SelectSize;
