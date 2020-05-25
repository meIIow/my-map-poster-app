import React, { Component } from 'react';
import StyleTree from './StyleTree.jsx';
import Instructions from './Instructions.jsx';

const STEP_NAME = `Style`;
const INSTRUCTIONS = `Add some Style!.`;

const collapse = (e) => {
  /* Toggle between adding and removing the "active" class,
  to highlight the button that controls the panel */
  console.log('you clicked?', e.target)
  e.target.classList.toggle("active");

  for (let child of e.target.children) {
    console.log(child);
    child.style.display = e.target.classList.contains('active') ? 'inherit' : 'none';
  }
}
const generateElementOptions = (elements) => {

}

const generateCollapsibleStyleTree = (features, elements, rules, depth) => {
  if (!Object.keys(features).length) return;
  return (
    <div>
      {Object.keys(features).map((feature) => {
        return  (
          <div class="collapsible" onClick={collapse}>
            {feature}
            {generateCollapsibleStyleTree(features[feature], elements, rules, depth + 1)}
          </div>
        )
      })}
    </div>
  );
}

const SelectStyle = (props) => {
  return (
    <div>
      <Instructions stepNumber={props.phase} stepName={STEP_NAME} instructions={INSTRUCTIONS}/>
      <div>
        {generateCollapsibleStyleTree(StyleTree.feature, StyleTree.element, StyleTree.rule, 0)}
      </div>
    </div>
  );
}

export default SelectStyle;
