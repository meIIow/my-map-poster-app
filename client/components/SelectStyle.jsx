import React, { Component } from 'react';
import StyleTree from '../style/StyleTree.jsx';

const MAP_STYLE_OPTIONS = [
  "roadmap",
  "satellite",
  "hybrid",
  "terrain"
];

const SelectStyle = (props) => {
  const valRef = { VALUE: props.extraStyleParams };
  const styleParamInput = document.getElementById("styleParamInput");
  if (styleParamInput) valRef.VALUE = styleParamInput.value;
  const setValRef = (e) => {
    valRef.VALUE = e.target.value;
  }
  const setOrClear = (props.extraStyleParams) ? "Clear" : "Set";
  const toggleParamInput = () => {
    if (props.extraStyleParams) return props.setExtraStyleParams("");
    return props.setExtraStyleParams(valRef.VALUE);
  }
  return (
    <div>
      <h3> Step {props.stepNumber}: Map Styling </h3>
      <br/>
      <div>
        <button class="importantButton" onClick={() => props.expandInstructions()}>Instructions</button>
      </div>
      <div>
        Map Type
        {MAP_STYLE_OPTIONS.map((rule) => {
          const inputId = rule + "-map";
          return (
            <div>
              <input checked={props.mapType == rule} type="radio" id={inputId} onChange={(e) => props.setMapType(e.target.value)} name="map-type" value={rule}></input>
              <label for={inputId}>{rule}</label>
            </div>
          )
        })}
      </div>
      <div>
        <div>Load Style:</div>
        {Object.keys(props.defaultStyles).map((style) => {
          return (
            <button class="tablinks" onClick={() => props.loadMapStyle(props.defaultStyles[style])}>
              {style}
            </button>
          )
        })}
        <br/>
        <input id="map-style-name" type='text'></input>
        <br/>
        <button class="importantButton" onClick={() => props.saveMapStyle(document.getElementById('map-style-name').value)}>
          Save Styling
        </button>
        <br/>
        <button onClick={() => props.expandStyleOverlay()}>
          Customize Styling
        </button>
        <div>
          <div><textarea id="styleParamInput" disabled={props.extraStyleParams} onInput={setValRef}>{valRef.VALUE}</textarea></div>
          <div><button onClick={() => toggleParamInput()}>{setOrClear}</button></div>
        </div>
      </div>
    </div>
  );
}

export default SelectStyle;
