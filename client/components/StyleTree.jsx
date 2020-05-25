const FeatureTree = {
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

const ElementTree = {
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

const StyleRuleSet = {
  /** Disable these (for now??)
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
  }, // boolean
  visibility: {
    type: 'choice',
    options: ['on', 'off', 'simplified']
  }, // on, off, or simplified
  color: {
    type: 'color',
  }, // hex string, eg #RRGGBB
  width: {
    type: 'int',
    min: 1
  } // positive integer
}

const addAll = (tree) => {
  if (!Object.keys(tree).length) return tree;
  for (const key in tree) {
    tree[key] = addAll(tree[key]);
  }
  tree.all = {};
  return tree;
}

const StyleTree = {
  feature: addAll(FeatureTree),
  element: addAll(ElementTree),
  rule: StyleRuleSet
}

export default StyleTree;
