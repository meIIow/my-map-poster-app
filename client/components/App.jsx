import React, { Component } from 'react';
const urlCreator = window.URL || window.webkitURL;

const MAP_BORDER_WIDTH = 20;

function getInitialState() {
  return {
    phase: 0,
    bounds: false,
    lock: true,
    ratio: { width: 3, height: 2 },
    units: { width: 1, height: 1},
    resolution: 200,
    pixels: { width: false, height: false },
    dimensions: { x: 100, y: 200 },
    range: { x: false, y: false },

    img: false // stores image data
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();

    // Binding methods
    //this.setMap = this.setMap.bind(this);
    this.snapToRatio = this.snapToRatio.bind(this);
    this.updateRatio = this.updateRatio.bind(this);
    this.calculateMapResize = this.calculateMapResize.bind(this);
    this.shrinkToFitDisplayArea = this.shrinkToFitDisplayArea.bind(this);
    this.resizeMap = this.resizeMap.bind(this);
    this.resizeMap2 = this.resizeMap2.bind(this);
  }

  updateRatio(width, height) {
    return;
    const updatedRatio = {
      width: width ? width : this.state.ratio.width,
      height: height ? height : this.state.ratio.height,
    };
    this.setState(Object.assign(
      this.state,
      {ratio: updatedRatio}
    ));
    this.snapToRatio();
  }

  snapToRatio() {
    const frame = document.getElementById('mapBorder');
    const myMap = document.getElementById('mapWrapper');
    const bounds = document.getElementById('mapDisplayArea');
    const { height: boundaryHeight, width: boundaryWidth } = bounds.getBoundingClientRect();
    const { height, width } = myMap.getBoundingClientRect();
    const widthToHeight = this.state.ratio.width / this.state.ratio.height;
    const x = this.state.dimensions.x;
    const y = this.state.dimensions.y;

    const updatedDimensions = this.shrinkToFitDisplayArea(
      Math.max(y, x / widthToHeight),
      Math.max(x, y * widthToHeight),
      widthToHeight
    );

    //frame.style.width = updatedDimensions.x + 20 + 'px';
    //frame.style.height = updatedDimensions.y + 20 + 'px';
    this.setState(Object.assign(
      this.state,
      {dimensions: updatedDimensions}
    ));
  }

  calculateMapResize(originalX, currentX, originalY, currentY, widthToHeight) {

    console.log(originalX, currentX, originalY, currentY, widthToHeight);
    // Percent change in each dimension.
    const dx = Math.abs(currentX - originalX) / originalX;
    const dy = Math.abs(currentY - originalY) / originalY;
    console.log("dx = " + dx, "dy = " + dy)

    // Resize height or width to match, depending on which was changed more
    return this.shrinkToFitDisplayArea(
      (dx <= dy) ? currentY : currentX / widthToHeight,
      (dx >= dy) ? currentX : currentY * widthToHeight,
      widthToHeight)
  }

  shrinkToFitDisplayArea(potentialHeight, potentialWidth, widthToHeight) {
    const maxWidth = document.getElementById('mapDisplayArea').getBoundingClientRect().width-MAP_BORDER_WIDTH;
    const maxHeight = document.getElementById('mapDisplayArea').getBoundingClientRect().height-MAP_BORDER_WIDTH;
    console.log(potentialHeight, potentialWidth, maxHeight, maxWidth);
    const widthOverflowPercent = (potentialWidth - maxWidth) / maxWidth;
    const heightOverflowPercent = (potentialHeight - maxHeight) / maxHeight;
    console.log(widthOverflowPercent);
    console.log(heightOverflowPercent);
    if (widthOverflowPercent <= 0 && heightOverflowPercent <= 0) {
      console.log("no overflow");
      return { y: potentialHeight, x: potentialWidth };
    }
    console.log("resizing to avoid overflow");

    if (widthOverflowPercent > heightOverflowPercent) {
      return { y: maxWidth / widthToHeight, x: maxWidth };
    } else {
      return { y: maxHeight, x: maxHeight * widthToHeight };
    }
  }

  resizeMap() {
    const border = document.getElementById('mapBorder');
    const myMap = document.getElementById('mapWrapper');
    console.log("Resize triggered.");

    const { height, width } = myMap.getBoundingClientRect();
    const updatedDimensions = this.calculateMapResize(
      this.state.dimensions.x,
      width,
      this.state.dimensions.y,
      height,
      this.state.ratio.width / this.state.ratio.height
    );
    // if (!updatedDimensions) return;

    console.log(updatedDimensions);
    this.setState(Object.assign(
      this.state,
      {dimensions: updatedDimensions}
    ));
  }

  resizeMap2(updatedDimensions) {
    const border = document.getElementById('mapBorder');
    border.style.width = updatedDimensions.x + 20 + 'px';
    border.style.height = updatedDimensions.y + 20 + 'px';
  }

  shouldComponentUpdate() {
    this.resizeMap2(this.state.dimensions);
  }

  componentDidMount() {
    const mapWrapper = document.getElementById('mapWrapper');
    const mapBorder = document.getElementById('mapBorder');
    const map = new google.maps.Map(mapWrapper, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
      clickableIcons: false,
      fullscreenControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ["hybrid", "roadmap"]
      },
      rotateControl: false,
      streetViewControl: false,
      tilt: 0
    });

    const { height, width } = document.getElementById('mapDisplayArea').getBoundingClientRect();
    console.log(height, width);
    mapBorder.style.height = height / 2 + 'px';
    mapBorder.style.width = width / 2 + 'px';
    mapBorder.style.resize = this.state.lock ? "horizontal" : "both";
    mapBorder.style.overflow = "auto";

    this.snapToRatio();

    // this.setState(Object.assign(
    //   this.state,
    //   {range: {x: height, y: width}}
    // ));
  }

  // setMap() {
  //   console.log('get map in range: ', southPas);
  //   const that = this; // loses reference to this when in post callback
  //   fetch('/photo', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(southPas),
  //   }).then(response => {
  //     if (response.status >= 200 && response.status < 300) {
  //       console.log(response)
  //       response.blob().then(data => {
  //         console.log(data);
  //         that.setState(Object.assign(
  //           that.state,
  //           { img: data },
  //         ));
  //         return Promise.resolve();
  //       })
  //     }
  //     return Promise.reject(response.statusText);
  //   });
  // }

  render() {
    console.log("App page rendering...")

    // Unnecessary for now
    // if (this.state.img) document.getElementById('mypic').src = urlCreator.createObjectURL(this.state.img);
    // const mapWrapper = (
    //   <div id="mapWrapper"></div>
    // );
    // const g = document.createElement('div');
    // g.setAttribute("id", "mapWrapper");
    // const map = new google.maps.Map(mapWrapper, {
    //   center: {lat: -34.397, lng: 150.644},
    //   zoom: 8,
    //   clickableIcons: false,
    //   fullscreenControl: false,
    //   mapTypeControl: true,
    //   mapTypeControlOptions: {
    //     mapTypeIds: ["hybrid", "roadmap"]
    //   },
    //   rotateControl: false,
    //   streetViewControl: false,
    //   tilt: 0
    // });

    return (
      <div id="boundsContainer">
        <div id="mapDisplayArea" onMouseMove={() => {this.resizeMap()}}><div id="mapBorder" onClick={() => {this.resizeMap()}}><div id="mapWrapper"></div></div></div>
        <div id="boundsOptions">
          <div>width:</div>
          <input type="number" id="width" min="1" max="100" value={this.state.ratio.width} onInput={(event) => {this.updateRatio(event.target.value, false)}}></input>
          <div>height:</div>
          <input type="number" id="height" min="1" max="100" value={this.state.ratio.height} onInput={(event) => {this.updateRatio(false, event.target.value)}}></input>
          <div>lock ratio:</div>
          <label class="switch">
            <input type="checkbox"></input>
            <span class="slider round"></span>
          </label>
          <div>width units:</div>
          <input type="number" id="width-units" min="1" max="100"></input>
          <div>height units:</div>
          <input type="number" id="height-units" min="1" max="100"></input>
          <div>lock ratio:</div>
          <label class="switch">
            <input type="checkbox"></input>
            <span class="slider round"></span>
          </label>
          <div>width-pixels:</div>
          <input type="number" disabled="disabled" id="width-pixels" min="1"></input>
          <div>height-pixels:</div>
          <input type="number" disabled="disabled" id="height-pixels" min="1"></input>
        </div>
      </div>
    );

    // return (
    //   <div>
    //     <h1>Hello!</h1>
    //   </div>
    // );
  }
}

export default App;
