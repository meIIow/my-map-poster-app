import React, { Component } from 'react';
import StyleTree from '../style/StyleTree.jsx';
import Instructions from './Instructions.jsx';

const STEP_NAME = `Style`;
const INSTRUCTIONS = `Add some Style!`;

const MAP_STYLE_OPTIONS = [
  "roadmap",
  "satellite",
  "hybrid",
  "terrain"
];

const SelectStyle = (props) => {
  return (
    <div>
      <Instructions stepNumber={props.phase} stepName={STEP_NAME} instructions={INSTRUCTIONS}/>
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
      <div id="style-tree-container" class="blank-feature">
        Style Tree
        Load Style:
        {Object.keys(props.defaultStyles).map((style) => {
          return (
            <button class="tablinks" onClick={() => props.loadMapStyle(props.defaultStyles[style])}>
              {style}
            </button>
          )
        })}
        <input id="map-style-name" type='text'></input>
        <button class="tablinks" onClick={() => props.saveMapStyle(document.getElementById('map-style-name').value)}>
          Save Styling
        </button>
        {StyleTree.render(props.tree, props.collapseFunc, props.toggleStyleChoice)}
      </div>
      <div>
        <button class="tablinks" onClick={() => console.log(StyleTree.getStyles(props.tree))}>Print</button>
      </div>
    </div>
  );
}

export default SelectStyle;
