import React, { Component } from 'react';
const urlCreator = window.URL || window.webkitURL;

const MAP_BORDER_WIDTH = 25;

function getInitialState() {
  return {
    phase: 0,
    bounds: false,
    lock: false,
    ratio: { width: 3, height: 2 },
    units: { width: 1, height: 1},
    resolution: 200,
    pixels: { width: false, height: false },
    dimensions: { x: 0, y: 0 },
    range: { x: false, y: false },

    img: false // stores image data
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();

    // Binding methods
    this.expandToFitRatio = this.expandToFitRatio.bind(this);
    this.updateRatio = this.updateRatio.bind(this);
    this.calculateMapResize = this.calculateMapResize.bind(this);
    this.shrinkToFitDisplayArea = this.shrinkToFitDisplayArea.bind(this);
    this.resizeMap = this.resizeMap.bind(this);
    this.resizeToFit = this.resizeToFit.bind(this);
    this.stretchFromEmpty = this.stretchFromEmpty.bind(this);
    this.snapToDimensions = this.snapToDimensions.bind(this);
  }

  toggleRatioLock() {
    const lock = document.getElementById('lock-ratio');
    if (!lock.checked) return this.setState({ lock: false });
    const dimensions = this.expandToFitRatio(this.state.dimensions, this.state.ratio);
    this.setState({ lock: true, dimensions });
  }

  updateRatio(width, height) {
    const ratio = {
      width: width ? width : this.state.ratio.width,
      height: height ? height : this.state.ratio.height,
    };
    const dimensions = this.expandToFitRatio(this.state.dimensions, ratio);
    this.setState({ ratio, dimensions });
  }

  expandToFitRatio(dimensions, ratio) {
    const widthToHeight = ratio.width / ratio.height;
    return this.resizeToFit({
      x: Math.max(dimensions.x, dimensions.y * widthToHeight),
      y: Math.max(dimensions.y, dimensions.x / widthToHeight)
    }, ratio);
  }

  calculateMapResize(x, y) {
    // Percent change in each dimension.
    const dx = Math.abs(x - this.state.dimensions.x) / this.state.dimensions.x;
    const dy = Math.abs(y - this.state.dimensions.y) / this.state.dimensions.y;
    const widthToHeight = this.state.ratio.width / this.state.ratio.height;
    console.log(dx, dy, x, y);

    // Resize height or width to match, depending on which was changed more
    return this.resizeToFit({
      x: (dx > dy) ? x : y * widthToHeight,
      y: (dx <= dy) ? y : x / widthToHeight
    }, this.state.ratio);
  }

  resizeToFit(dimensions, ratio) {
    return this.shrinkToFitDisplayArea(this.stretchFromEmpty(dimensions, ratio), ratio);
  }

  stretchFromEmpty(dimensions, ratio) {
    if (dimensions.x >= 1 && dimensions.y >= 1) return dimensions;
    return { x: ratio.width, y: ratio.height };
  }

  shrinkToFitDisplayArea(dimensions, ratio) {
    // Get dimensions of entire display area
    const bounds = document.getElementById('mapDisplayArea');
    const maxWidth = bounds.getBoundingClientRect().width - MAP_BORDER_WIDTH;
    const maxHeight = bounds.getBoundingClientRect().height - MAP_BORDER_WIDTH;

    const widthToHeight = ratio.width / ratio.height;

    // Calculate how much overflow in each direction
    const widthOverflowPercent = (dimensions.x - maxWidth) / maxWidth;
    const heightOverflowPercent = (dimensions.y - maxHeight) / maxHeight;

    if (widthOverflowPercent <= 0 && heightOverflowPercent <= 0) {
      console.log("No overflow");
      return dimensions;
    }

    console.log("Shrinking map to avoid overflow");
    if (widthOverflowPercent > heightOverflowPercent) {
      return { y: maxWidth / widthToHeight, x: maxWidth };
    } else {
      return { y: maxHeight, x: maxHeight * widthToHeight };
    }
  }

  resizeMap() {
    const myMap = document.getElementById('mapWrapper');
    console.log("Resize triggered.");
    console.log(this.state);

    const { height, width } = myMap.getBoundingClientRect();
    console.log("height = " + height, "width = " + width);
    if (!this.state.lock) return this.setState({ dimensions: {x: width, y: height} });
    const updatedDimensions = this.calculateMapResize(width, height);

    console.log("dimensions", updatedDimensions);
    console.log(this.state.dimensions);
    this.setState({ dimensions: updatedDimensions });
  }

  snapToDimensions() {
    const border = document.getElementById('mapBorder');
    border.style.width = this.state.dimensions.x + MAP_BORDER_WIDTH + 'px';
    border.style.height = this.state.dimensions.y + MAP_BORDER_WIDTH + 'px';
  }

  componentDidUpdate() {
    this.snapToDimensions();
  }

  componentDidMount() {
    const mapWrapper = document.getElementById('mapWrapper');
    const mapBorder = document.getElementById('mapBorder');
    const map = new google.maps.Map(mapWrapper, {
      center: {lat:-33.8707972, lng: 151.2070504},
      zoom: 13,
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

    const input = document.getElementById('pac-input');
    const center = document.getElementById('re-center');
    const autocomplete = new google.maps.places.Autocomplete(input);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(['geometry.location', 'name']);

    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry.location) {
        return window.alert(`No details available for input: ${place.name}`);
      }
      map.setCenter(place.geometry.location);
    });

    center.addEventListener('click', function(e) {
      console.log('something');
      //if (e.key !== 'Enter') return;
      var place = autocomplete.getPlace();
      if (!place.geometry.location) {
        return window.alert(`No details available for input: ${place.name}`);
      }
      map.setCenter(place.geometry.location);
    });


    const { height, width } = document.getElementById('mapDisplayArea').getBoundingClientRect();
    console.log(height, width);
    mapBorder.style.height = height / 2 + 'px';
    mapBorder.style.width = width / 2 + 'px';
    mapBorder.style.resize = "both";
    mapBorder.style.overflow = "auto";

    if (this.state.lock) this.resizeMap();
  }

  render() {
    console.log("App page rendering...")

    return (
      <div id="boundsContainer">
        <div id="mapDisplayArea"><div id="mapBorder" onMouseUp={() => {this.resizeMap()}}><div id="mapWrapper"></div></div></div>
        <div id="boundsOptions">
          <input id="pac-input" type="text" placeholder="Enter a location"></input>
          <input id="re-center" type="button" value="Re-Center Map"></input>
          <div>width:</div>
          <input type="number" id="width" min="1" max="100" value={this.state.ratio.width} onInput={(event) => {this.updateRatio(event.target.value, false)}}></input>
          <div>height:</div>
          <input type="number" id="height" min="1" max="100" value={this.state.ratio.height} onInput={(event) => {this.updateRatio(false, event.target.value)}}></input>
          <div>lock ratio:</div>
          <label class="switch">
            <input id="lock-ratio" type="checkbox" onClick={() => this.toggleRatioLock()}></input>
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
  }
}

export default App;
