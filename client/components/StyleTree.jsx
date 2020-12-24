import React, { Component } from 'react';

const FEATURE_TREE_TEMPLATE = {
  administrative: {
    country: {},
    land_parcel: {},
    locality: {},
    neighborhood: {},
    province: {}
  },
  landscape: {
    man_made: {},
    natural: {
      landcover: {},
      terrain: {}
    }
  },
  poi: {
    attraction: {},
    business: {},
    school: {},
    government: {},
    park: {},
    medical: {},
    place_of_worship: {},
    sports_complex: {}
  },
  road: {
    arterial: {},
    highway: {},
    local: {}
  },
  transit: {
    line: {},
    station: {
      bus: {},
      airport: {},
      rail: {}
    }
  }
}

const ELEMENT_TREE_TEMPLATE = {
  geometry: {
    fill: {},
    stroke: {}
  },
  labels: {
    icon: {},
    text: {
      fill: {},
      stroke: {}
    }
  }
}

const STYLE_RULES = {
  /** Disable these (possibly forever, can set color directly instead)
  hue: {
    type: 'color',
  }, // hex string, eg #RRGGBB
  brightness: {
    type: 'float',
    min: -100,
    max: 100,
  }, // (-100, 100)
  saturation: {
    type: 'float',
    min: -100,
    max: 100,
  }, // (-100, 100)
  gamma: {
    type: 'float',
    min: 0.01,
    max: 10,
  }, // (0.01, 10)
  **/
  invert_lightness: {
    type: 'bool',
  },
  visibility: {
    type: 'choice',
    options: ['on', 'off', 'simplified']
  },
  color: {
    type: 'color', // hex string, eg #RRGGBB
  },
  width: {
    type: 'int', // positive
    min: 1
  }
}

const addAll = (tree) => {
  if (!Object.keys(tree).length) return tree;
  for (const key in tree) {
    tree[key] = addAll(tree[key]);
  }
  tree.all = {};
  return tree;
}

const buildDefaultFeatureTreeFromTemplate = () => {
  return buildDefaultFeatureTree("", FEATURE_TREE_TEMPLATE, ELEMENT_TREE_TEMPLATE, STYLE_RULES);
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
  const node =  JSON.parse(JSON.stringify(rules));
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
          )
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
    console.log(e, f, g);
    console.log(e.target);
    console.log(valRef.VALUE);
    valRef.VALUE = e.target.value;
  };
  // const valueOrDefault = (def) => {
  //   return (val) => (val == undefined) ? def : val;
  // };
  // const valueOrBlack = valueOrDefault("#000000");
  // const valueOrSimplified = valueOrDefault("simplified");
  // const valueOrFalse = valueOrDefault(false);

  const updateCheck = (e) => valRef.VALUE = e.target.checked;
  if (rule.type === 'color') return <input disabled={set} type='color' defaultValue={valRef.VALUE} onInput={updateVal}></input>
  if (rule.type === 'bool') return <input disabled={set} type='checkbox' defaultChecked={valRef.VALUE} onInput={updateCheck}></input>
  //if (rule.type === 'float') return <input disabled={set} type='range' value={rule.VALUE} onInput={updateVal} min={rule.min} max={rule.max}></input>
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

const convertStylesToMapParams = (styles) => {
  // f, e, tree, rule, value
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

const pullStylesFromStyleTree = (tree) => {
  const specs = buildDefaultElementTree("", ELEMENT_TREE_TEMPLATE, STYLE_RULES);
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
  // console.log(f);
  // console.log(e);
  // console.log(tree);
  // console.log(specs);
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

const updateHighlights = (styleTree) => {
  styleTree.HIGHLIGHT = false;
  if ("FEATURES" in styleTree) {
    for (const feature in styleTree.FEATURES) {
      updateHighlights(styleTree.FEATURES[feature]);
      if (styleTree.FEATURES[feature].HIGHLIGHT) { styleTree.HIGHLIGHT = true }
    }
  }
  if ("ELEMENT" in styleTree) {
    updateHighlights(styleTree.ELEMENT)
    if (styleTree.ELEMENT.HIGHLIGHT) { styleTree.HIGHLIGHT = true }
  }
  if ("ELEMENTS" in styleTree) {
    for (const element in styleTree.ELEMENTS) {
      updateHighlights(styleTree.ELEMENTS[element]);
      if (styleTree.ELEMENTS[element].HIGHLIGHT) { styleTree.HIGHLIGHT = true }
    }
  }
  if ("RULES" in styleTree) {
    for (const rule in styleTree.RULES) {
      if (styleTree.RULES[rule].SET) { styleTree.HIGHLIGHT = true }
    }
  }
  return styleTree;
}

const collapseTree = (tree, depth) => {
  if (tree.COLLAPSE === false && depth > 0) {
    tree.COLLAPSE = true;
  }
  if ("FEATURES" in tree) {
    for (const feature in tree.FEATURES) {
      collapseTree(tree.FEATURES[feature], depth + 1);
    }
  }
  if ("ELEMENT" in tree) {
    collapseTree(tree.ELEMENT, 0)
  }
  if ("ELEMENTS" in tree) {
    for (const element in tree.ELEMENTS) {
      collapseTree(tree.ELEMENTS[element], depth + 1);
    }
  }
}

const StyleTree = {
  // feature: addAll(FEATURE_TREE_TEMPLATE),
  // element: addAll(ELEMENT_TREE_TEMPLATE),
  rule: STYLE_RULES,
  getDefault: () => buildDefaultFeatureTreeFromTemplate(),
  render: (tree, collapseFunc, toggleStyleChoice) => createFeatureStyleTree(tree, collapseFunc, toggleStyleChoice),
  getStyles: (tree) => pullStylesFromStyleTree(tree),
  getStyleParams: (tree) => convertStylesToMapParams(pullStylesFromStyleTree(tree)),
  highlight: (tree) => updateHighlights(tree),
  collapse: (tree) => collapseTree(tree, 0),
}

export default StyleTree;
