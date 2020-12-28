import React, { Component } from 'react';
import StyleTree from '../style/StyleTree.jsx';

const CustomizeStyle = (props) => {
  return (
    <div id="style-tree-container" class="blank-feature">
      {StyleTree.render(props.tree, props.collapseFunc, props.toggleStyleChoice)}
    </div>
  );
}

export default CustomizeStyle;
