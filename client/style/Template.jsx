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
    highway: {
      controlled_access: {},
    },
    local: {}
  },
  transit: {
    line: {},
    station: {
      bus: {},
      airport: {},
      rail: {}
    }
  },
  water: {},
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

const Template = {
  features: FEATURE_TREE_TEMPLATE,
  elements: ELEMENT_TREE_TEMPLATE,
  rules: STYLE_RULES,
}

export default Template;
