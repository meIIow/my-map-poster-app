import React, { Component } from 'react';

const clone = (tree) => JSON.parse(JSON.stringify(tree));

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

const createSparseTree = (styleTree) => {
  const sparseTree = {};
  if ("FEATURES" in styleTree) {
    sparseTree.FEATURES = {};
    for (const feature in styleTree.FEATURES) {
      if (styleTree.FEATURES[feature].HIGHLIGHT) {
        sparseTree.FEATURES[feature] = createSparseTree(styleTree.FEATURES[feature]);
      }
    }
  }
  if ("ELEMENT" in styleTree) {
    sparseTree.ELEMENT = {};
    if (styleTree.ELEMENT.HIGHLIGHT) {
      sparseTree.ELEMENT = createSparseTree(styleTree.ELEMENT);
    }
  }
  if ("ELEMENTS" in styleTree) {
    sparseTree.ELEMENTS = {};
    for (const element in styleTree.ELEMENTS) {
      if (styleTree.ELEMENTS[element].HIGHLIGHT) {
        sparseTree.ELEMENTS[element] = createSparseTree(styleTree.ELEMENTS[element]);
      }
    }
  }
  if ("RULES" in styleTree) {
    sparseTree.RULES = {};
    for (const rule in styleTree.RULES) {
      if (styleTree.RULES[rule].SET) {
        sparseTree.RULES[rule] = styleTree.RULES[rule];
      }
    }
  }
  return sparseTree;
}

const mergeIntoSparseTree = (styleTree, sparseTree) => {
  if ("FEATURES" in sparseTree) {
    for (const feature in sparseTree.FEATURES) {
      mergeIntoSparseTree(styleTree.FEATURES[feature], sparseTree.FEATURES[feature]);
    }
  }
  if ("ELEMENT" in sparseTree) {
    mergeIntoSparseTree(styleTree.ELEMENT, sparseTree.ELEMENT);
  }
  if ("ELEMENTS" in sparseTree) {
    for (const element in sparseTree.ELEMENTS) {
      mergeIntoSparseTree(styleTree.ELEMENTS[element], sparseTree.ELEMENTS[element]);
    }
  }
  if ("RULES" in sparseTree) {
    for (const rule in sparseTree.RULES) {
      styleTree.RULES[rule] = sparseTree.RULES[rule];
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

const StyleUtil = {
  highlight: (tree) => updateHighlights(tree),
  collapse: (tree) => collapseTree(tree, 0),
  clone: (tree) => clone(tree),
  strip:  (tree) => createSparseTree(tree),
  merge: (tree, sparse) => mergeIntoSparseTree(tree, sparse),
}

export default StyleUtil;
