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
  invert_lighness: {
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
  };
  for (const feature in features) {
    node.FEATURES[prefix + feature] =
      buildDefaultFeatureTree(prefix + feature + ".", features[feature], elements, rules);
  }
  node.ELEMENT = buildDefaultElementTree("", elements, rules)
  return node;
}

const buildDefaultElementTree = (prefix, elements, rules) => {
  const node = {
    ELEMENTS: {},
    RULES: {},
    COLLAPSE: prefix != "",
  };
  for (const element in elements) {
    node.ELEMENTS[prefix + element] = buildDefaultElementTree(prefix + element + ".", elements[element], rules);
  }
  node.RULES = buildDefaultRuleTree(rules);
  return node;
}

const buildDefaultRuleTree = (rules) => {
  const node = {... rules};
  for (const rule in node) {
    node[rule].SET = false;
  }
  return node;
}

const createFeatureStyleTree= (tree, collapseFunc, toggleStyleChoice) => {
  //if (!Object.keys(features).length) return;
  return (
    <div>
      <ul class={(tree.COLLAPSE) ? "nested" : "active"}>
        <li>
          {createElementStyleTree(tree.ELEMENT, collapseFunc, toggleStyleChoice)}
        </li>
        {Object.keys(tree.FEATURES).map((feature) => {
          return (
            <li>
              <span class={(!tree.FEATURES[feature].COLLAPSE) ? "caret-down" : "caret"} onClick={(e) => collapseFunc(tree.FEATURES[feature])}>{feature}</span>
              {createFeatureStyleTree(tree.FEATURES[feature], collapseFunc, toggleStyleChoice)}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

const createElementStyleTree = (tree, collapseFunc, toggleStyleChoice) => {
  return (
    <div>
      <ul class={(tree.COLLAPSE) ? "nested" : "active"}>
        <li>
          {createRulesStyleTree(tree.RULES, toggleStyleChoice)}
        </li>
        {Object.keys(tree.ELEMENTS).map((element) => {
          return (
            <li>
            <span class={(!tree.ELEMENTS[element].COLLAPSE) ? "caret-down" : "caret"} onClick={(e) => collapseFunc(tree.ELEMENTS[element])}>{element}</span>
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
    <div>
      {Object.keys(tree).map((rule) => {
        const valRef = { VALUE: tree[rule].VALUE };
        const updateVal = (e) => valRef.VALUE = e.value;
        return (
          <div>
            <div>{rule}</div>
            {styleRuleToInput(tree[rule], updateVal)}
            <button onClick={() => toggle(tree[rule], !tree[rule].SET, valRef.VALUE)}>{(!tree[rule].SET) ? "Set" : "Clear"}</button>
          </div>
        )
      })}
    </div>
  )
}

const styleRuleToInput = (rule, updateVal) => {
  const set = rule.SET;
  if (rule.type === 'color') return <input disabled={set} type='color' onInput={updateVal} value={setInput(set, rule)}></input>
  if (rule.type === 'bool') return <input disabled={set} type='checkbox' onInput={updateVal} value={setInput(set, rule)}></input>
  if (rule.type === 'float') return <input disabled={set} type='range' onInput={updateVal} min={rule.min} max={rule.max} value={setInput(set, rule)}></input>
  if (rule.type === 'int') return <input disabled={set} type='number' onInput={updateVal} min={rule.min} max={rule.max} step='1' value={setInput(set, rule)}></input>
  if (rule.type === 'choice') return (
      <select onInput={updateVal} disabled={set} value={setInput(set, rule)}>
        {rule.options.map((option) => {
          return <option value={option}>{option}</option>
        })}
      </select>
    )
  console.log('This style rule is unsupported: ', rule);
}

const setInput = (set, rule) => {
  return (set) ? rule.VALUE : undefined;
}

const addSharedRuleState = (rule) => {

}

const StyleTree = {
  feature: addAll(FEATURE_TREE_TEMPLATE),
  element: addAll(ELEMENT_TREE_TEMPLATE),
  rule: STYLE_RULES,
  getDefault: () => buildDefaultFeatureTreeFromTemplate(),
  render: (tree, collapseFunc, toggleStyleChoice) => createFeatureStyleTree(tree, collapseFunc, toggleStyleChoice),
}

export default StyleTree;
