import React, { Component } from 'react';
import StyleTree from './StyleTree.jsx';
import Instructions from './Instructions.jsx';

const STEP_NAME = `Style`;
const INSTRUCTIONS = `Add some Style!`;
//
// const collapse = (e) => {
//   /* Toggle between adding and removing the "active" class,
//   to highlight the button that controls the panel */
//   console.log('you clicked?', e.target)
//   e.target.classList.toggle("active");
//
//   for (let child of e.target.children) {
//     console.log(child);
//     child.style.display = e.target.classList.contains('active') ? 'inherit' : 'none';
//   }
// }
//
// // To Do...
// const generateElementOptions = (elements) => {
//   if (!Object.keys(elements).length) return;
//   return (
//     <div>
//       {Object.keys(elements).map((element) => {
//         return (
//           <div class="collapsible" onClick={collapse}>
//             {element}
//             {generateRuleOptions(StyleTree.rule)}
//             {generateElementOptions(elements[element])}
//           </div>
//         )
//       })}
//     </div>
//   )
// }
//
// const styleRuleToInput = (rule) => {
//   if (rule.type === 'color') return <input type='color'></input>
//   if (rule.type === 'bool') return <input type='checkbox'></input>
//   if (rule.type === 'float') return <input type='range' min={rule.min} max={rule.max}></input>
//   if (rule.type === 'int') return <input type='number' min={rule.min} max={rule.max} step='1'></input>
//   if (rule.type === 'choice') return (
//       <select onChange={() => {}}>
//         {rule.options.map((option) => {
//           return <option value={option}>{option}</option>
//         })}
//       </select>
//     )
//   console.log('This style rule is unsupported: ', rule);
// }
//
// const generateRuleOptions = (rules) => {
//   return (
//     <div>
//       {Object.keys(rules).map((rule) => {
//         return (
//           <div>
//             <div>{rule}</div>
//             {styleRuleToInput(rules[rule])}
//           </div>
//         )
//       })}
//     </div>
//   )
// }
//
// const generateCollapsibleStyleTree = (features, elements, rules, depth) => {
//   if (!Object.keys(features).length) return;
//   return (
//     <div>
//       {Object.keys(features).map((feature) => {
//         return  (
//           <div class="collapsible" onClick={collapse}>
//             {feature}
//             {generateElementOptions(elements)}
//             {generateCollapsibleStyleTree(features[feature], elements, rules, depth + 1)}
//           </div>
//         )
//       })}
//     </div>
//   );
// }

const SelectStyle = (props) => {
  return (
    <div>
      <Instructions stepNumber={props.phase} stepName={STEP_NAME} instructions={INSTRUCTIONS}/>
      <div id="style-tree-container">
        {StyleTree.render(props.tree, props.collapseFunc, props.toggleStyleChoice)}
      </div>
      <div>
        <button class="tablinks" onClick={() => console.log(StyleTree.getStyles(props.tree))}>Print</button>
      </div>
    </div>
  );
}

export default SelectStyle;
