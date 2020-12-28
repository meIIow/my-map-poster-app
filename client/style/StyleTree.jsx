import React, { Component } from 'react';
import StyleUtil from '../style/StyleUtil.jsx';
import Template from '../style/Template.jsx';

const buildDefaultFeatureTreeFromTemplate = () => {
  return buildDefaultFeatureTree("", Template.features, Template.elements, Template.rules);
}

const buildDefaultFeatureTree = (prefix, features, elements, rules) => {
  const node = {
    FEATURES: {},
    ELEMENT: {},
    COLLAPSE: prefix != "",
    HIGHLIGHT: false,
  };
  for (const feature in features) {
    node.FEATURES[prefix + feature] =
      buildDefaultFeatureTree(prefix + feature + ".", features[feature], elements, rules);
  }
  node.ELEMENT = buildDefaultElementTree("", elements, rules);
  return node;
}

const buildDefaultElementTree = (prefix, elements, rules) => {
  const node = {
    ELEMENTS: {},
    RULES: {},
    COLLAPSE: prefix != "",
    HIGHLIGHT: false,
  };
  for (const element in elements) {
    node.ELEMENTS[prefix + element] = buildDefaultElementTree(prefix + element + ".", elements[element], rules);
  }
  node.RULES = buildDefaultRuleTree(rules);
  return node;
}

const buildDefaultRuleTree = (rules) => {
  const node = StyleUtil.clone(rules);
  for (const rule in node) {
    node[rule].SET = false;
  }
  return node;
}

const createFeatureStyleTree= (tree, collapseFunc, toggleStyleChoice) => {
  const classes = ((tree.COLLAPSE) ? "nested" : "active");
  return (
    <div class="tree-div">
      <ul class={classes}>
        <li>
          {createElementStyleTree(tree.ELEMENT, collapseFunc, toggleStyleChoice)}
        </li>
        {Object.keys(tree.FEATURES).map((feature) => {
          const listClasses = ((tree.FEATURES[feature].HIGHLIGHT) ? "waterfall-feature" : "blank-feature");
          const dropClasses =
            ((!tree.FEATURES[feature].COLLAPSE) ? "caret-down" : "caret") + " " + listClasses;
          return (
            <li class={listClasses}>
              <span class={dropClasses} onClick={(e) => collapseFunc(tree.FEATURES[feature])}>{feature}</span>
              {createFeatureStyleTree(tree.FEATURES[feature], collapseFunc, toggleStyleChoice)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const createElementStyleTree = (tree, collapseFunc, toggleStyleChoice) => {
  const classes = ((tree.COLLAPSE) ? "nested" : "active");
  return (
    <div class="tree-div">
      <ul class={classes}>
        <li>
          {createRulesStyleTree(tree.RULES, toggleStyleChoice)}
        </li>
        {Object.keys(tree.ELEMENTS).map((element) => {
          const listClasses = ((tree.ELEMENTS[element].HIGHLIGHT) ? "waterfall-element" : "blank-element");
          const dropClasses = ((!tree.ELEMENTS[element].COLLAPSE) ? "caret-down" : "caret") + " " + listClasses;
          return (
            <li class={listClasses}>
              <span class={dropClasses} onClick={(e) => collapseFunc(tree.ELEMENTS[element])}>{element}</span>
              {createElementStyleTree(tree.ELEMENTS[element], collapseFunc, toggleStyleChoice)}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

const createRulesStyleTree = (tree, toggle) => {
  return (
    <div class="blank-rule">
      {Object.keys(tree).map((rule) => {
        let def;
        if (tree[rule].type === "color") def = "#000000";
        if (tree[rule].type === "choice") def = "simplified";
        if (tree[rule].type === "bool") def = false;

        const valRef = { VALUE: (tree[rule].VALUE == undefined) ? def : tree[rule].VALUE };
        const setOrClear = () => {
          toggle(tree[rule], !tree[rule].SET, valRef.VALUE);
        }
        return (
          <div class={(tree[rule].SET) ? "chosen" : "waterfall"}>
            <div>{rule}</div>
            {styleRuleToInput(tree[rule], valRef)}
            <button onClick={setOrClear}>{(!tree[rule].SET) ? "Set" : "Clear"}</button>
          </div>
        )
      })}
    </div>
  )
}

const styleRuleToInput = (rule, valRef) => {
  const set = rule.SET;
  const updateVal = (e, f, g) => {
    valRef.VALUE = e.target.value;
  };

  const updateCheck = (e) => valRef.VALUE = e.target.checked;
  if (rule.type === 'color') return <input disabled={set} type='color' defaultValue={valRef.VALUE} onInput={updateVal}></input>
  if (rule.type === 'bool') return <input disabled={set} type='checkbox' defaultChecked={valRef.VALUE} onInput={updateCheck}></input>
  if (rule.type === 'int') return <input disabled={set} type='number' defaultValue={valRef.VALUE} onInput={updateVal} min={rule.min} max={rule.max} step='1'></input>
  if (rule.type === 'choice') return (
      <select onInput={updateVal} disabled={set} defaultValue={valRef.VALUE}>
        {rule.options.map((option) => {
          return <option value={option}>{option}</option>
        })}
      </select>
    )
  console.log('This style rule is unsupported: ', rule);
}

const pullStylesFromStyleTree = (tree) => {
  const specs = buildDefaultElementTree("", Template.elements, Template.rules);
  const styles = [];
  pullStylesFromFeatureTree("all", tree, specs, styles);
  return styles;
}

const pullStylesFromFeatureTree = (f, tree, oldSpecs, styles) => {
  const specs = pullStylesFromElementTree(f, "all", tree.ELEMENT, oldSpecs, styles);
  for (const feature in tree.FEATURES) {
    pullStylesFromFeatureTree(feature, tree.FEATURES[feature], JSON.parse(JSON.stringify(specs)), styles);
  }
}

const pullStylesFromElementTree = (f, e, tree, specs, styles) => {
  for (const rule in tree.RULES) {
    if (tree.RULES[rule].SET && tree.RULES[rule].VALUE != specs.RULES[rule].VALUE) {
      styles.push({f, e, rule, value: tree.RULES[rule].VALUE});
      propagateSpecs(specs, rule, tree.RULES[rule].VALUE);
    }
  }
  for (const element in tree.ELEMENTS) {
    pullStylesFromElementTree(f, element, tree.ELEMENTS[element], specs.ELEMENTS[element], styles);
  }
  return specs;
}

const propagateSpecs = (specs, rule, value) => {
  specs.RULES[rule].VALUE = value;
  for (const element in specs.ELEMENTS) {
    propagateSpecs(specs.ELEMENTS[element], rule, value);
  }
}

const convertStylesToMapParams = (styles) => {
  let params = "";
  console.log(styles)
  for (const style of styles) {
    console.log(style)
    const val = (style.rule==="color") ? colorToHex(style.value) : style.value;
    const param = "&style=feature:" + style.f + "|element:" + style.e + "|" + style.rule + ":" + val;
    console.log(param);
    params += param;
  }
  return params;
}

const colorToHex = (color) => {
  return "0x" + color.substring(1);
}

const StyleTree = {
  getStyles: (tree) => pullStylesFromStyleTree(tree),
  getStyleParams: (tree) => convertStylesToMapParams(pullStylesFromStyleTree(tree)),
  getDefault: () => buildDefaultFeatureTreeFromTemplate(),
  render: (tree, collapseFunc, toggleStyleChoice) => createFeatureStyleTree(tree, collapseFunc, toggleStyleChoice),
}

export default StyleTree;
