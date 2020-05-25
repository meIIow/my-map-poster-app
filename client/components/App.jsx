import React, { Component } from 'react';
import NextButton from './Next.jsx';
import SelectBorder from './SelectBorder.jsx';
import SelectSize from './SelectSize.jsx';
const urlCreator = window.URL || window.webkitURL;

const MAP_BORDER_WIDTH = 25;
const BORDER_PHASE = 0;
const SIZE_PHASE = 1;
const STYLE_PHASE = 2;
const FINAL_PHASE = 3;

let myMap;
let bounds;
let center;

function getInitialState() {
  return {
    phase: 0,
    bounds: false,
    lock: false,
    mult: {ratio: 1, dimensions: 1},
    mult2: .01,
    withUnits: false,
    ratio: { width: 3, height: 2 },
    units: { width: 1, height: 1},
    resolution: 200,
    dimensions: { x: 0, y: 0 },
    unit: 'Inches',
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
    this.setUnits = this.setUnits.bind(this);
    this.toggleRatioLock = this.toggleRatioLock.bind(this);
    this.updateResolution = this.updateResolution.bind(this);
    this.updateUnitType = this.updateUnitType.bind(this);
    this.getUnits = this.getUnits.bind(this);
    this.submit = this.submit.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.infoOrSample = this.infoOrSample.bind(this);
    this.getSample = this.getSample.bind(this);
  }

  bind() {
    myMap.setOptions({
      restriction: {
        latLngBounds: myMap.getBounds(),
        strictBounds: true
      }
    });
  }

  infoOrSample() {
    console.log("xyz");
    if (this.state.phase === 0) return this.getInfo();
    this.getSample();
  }

  getSample() {
    const url = '/preview';
    const center = myMap.getCenter();
    const parcel = {
      lat: center.lat(),
      lng: center.lng(),
      height: this.state.bounds.height,
      width:  this.state.bounds.width,
      zoom: this.state.bounds.zoom,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parcel),
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        response.blob().then(data => {
          console.log("data", data);
          document.getElementById('mypic').src = urlCreator.createObjectURL(data);
          return Promise.resolve();
        });
      }
      console.log("prollem");
      return Promise.reject(response.statusText);
    });
  }

  getInfo() {
    const url = '/border';
    const x = myMap.getBounds();
    const parcel = {
      northWestLatLng: {lat: x.getNorthEast().lat(), lng: x.getSouthWest().lng()},
      southEastLatLng: {lat: x.getSouthWest().lat(), lng: x.getNorthEast().lng()},
      height: Math.round(this.getUnits().y * this.state.resolution),
      width:  Math.round(this.getUnits().x * this.state.resolution),
      lock: this.state.lock
    }

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parcel),
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        return response.json();
      }
      return Promise.reject(response.statusText);
    }).then((json) => {
      console.log(json);
      this.setState({bounds: json, phase: STYLE_PHASE});
    });
  }

  submit() {
    const url = '/photo';
    const x = myMap.getBounds();
    const parcel = {
      northWestLatLng: {lat: x.getNorthEast().lat(), lng: x.getSouthWest().lng()},
      southEastLatLng: {lat: x.getSouthWest().lat(), lng: x.getNorthEast().lng()},
      height: (this.state.lock) ? this.state.ratio.height * this.state.mult.ratio * this.state.resolution :  this.state.dimensions.y * this.state.mult.dimensions,
      width: (this.state.lock) ? this.state.ratio.width * this.state.mult.ratio * this.state.resolution :  this.state.dimensions.x * this.state.mult.dimensions,
    }

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parcel),
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        response.blob().then(data => {
          console.log(data);
          document.getElementById('mypic').src = urlCreator.createObjectURL(data);
          return Promise.resolve();
        })
      }
      return Promise.reject(response.statusText);
    });
  }

  toggleRatioLock() {
    const lock = document.getElementById('lock-ratio');
    console.log(this.state.lock);
    if (this.state.lock) return this.setState({ lock: false });
    const dimensions = this.expandToFitRatio(this.state.dimensions, this.state.ratio);
    this.setState({ lock: true, dimensions });
  }

  getUnits() {
    // Rounded to nearest thousandth
    return {
      x: (Math.round((this.state.dimensions.x * this.state.mult2 + Number.EPSILON) * 1000) / 1000),
      y: (Math.round((this.state.dimensions.y * this.state.mult2 + Number.EPSILON) * 1000) / 1000)
    }
  }

  updateUnitType(unit) {
    let mult2 = this.state.mult2;
    let resolution = this.state.resolution;
    if (unit === "Pixels") {
      mult2 = mult2 * resolution;
      resolution = 1;
    }
    return this.setState({unit, mult2, resolution});
  }

  updateResolution(resolution) {
    this.setState({resolution});
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

  setUnits(width, height) {
    const mult2 = (width !== null) ? width / this.state.dimensions.x : height / this.state.dimensions.y;
    this.setState({mult2});
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
    if (this.state.phase !== 0) return;
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
    if (this.state.phase !== 0) return;
    const border = document.getElementById('mapBorder');
    border.style.width = this.state.dimensions.x + MAP_BORDER_WIDTH + 'px';
    border.style.height = this.state.dimensions.y + MAP_BORDER_WIDTH + 'px';
  }

  // Derives map, wrapper and border state from app state
  syncMap() {
    const mapWrapper = document.getElementById('mapWrapper');
    const mapBorder = document.getElementById('mapBorder');
    if (!mapWrapper || !mapBorder || !myMap) return; // Ignore if not yet loaded.
    mapBorder.style.resize = (this.state.phase === BORDER_PHASE) ? "both" : 'none';
    myMap.setOptions({
      disableDefaultUI: (this.state.phase !== BORDER_PHASE),
      draggable: (this.state.phase !== SIZE_PHASE),
    });

    // May be better to just render a whole separate map after size is chosen...
    if (this.state.phase === STYLE_PHASE) {
      // Effectively remove border and expand map to take up the entire space.
      // Will need to extract this and potentially change depending on phase
      // ...or back will begin to fail prolly...
      mapBorder.style.width = '100%';
      mapBorder.style.height = '100%';
      mapWrapper.style.width = '100%';
      mapWrapper.style.height = '100%';
      mapWrapper.style.maxWidth = this.state.bounds.width + 'px';
      mapWrapper.style.maxHeight = this.state.bounds.height + 'px';

      const sample = document.getElementById('mypic');
      sample.style.visibility = "inherit";

      // Bound map to the exact area and zoom the actual map will contain.
      myMap.setOptions({
        restriction: {
          latLngBounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(this.state.bounds.bounds.south.value, this.state.bounds.bounds.west.value),
            new google.maps.LatLng(this.state.bounds.bounds.north.value, this.state.bounds.bounds.east.value)),
          strictBounds: true
        },
        zoom: this.state.bounds.zoom,
        minZoom: this.state.bounds.zoom,
        maxZoom: this.state.bounds.zoom,
      });
    }
  }

  componentDidUpdate() {
    this.snapToDimensions();
    this.syncMap();

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
    myMap = map;

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

    this.resizeMap();
  }

  render() {
    console.log("App page rendering...")

    const selects = [
      <SelectBorder phase={1} ratio ={this.state.ratio} updateRatio ={this.updateRatio} toggleRatioLock = {this.toggleRatioLock} lock = {this.state.lock}/>,
      <SelectSize phase={2} resolution = {this.state.resolution} updateResolution = {this.updateResolution} setUnits={this.setUnits} unit={this.state.unit} updateUnitType={this.updateUnitType} getUnits={this.getUnits}/>
    ]

    const nextButtons = [
      <NextButton click={() => this.setState({ phase: SIZE_PHASE})}/>,
      <NextButton test='Get It!!' click={() => this.getInfo()}/>,
      <NextButton text='Get a Sample!!' click={() => this.getSample()}/>
    ]

    return (
      <div id="boundsContainer">
        <div id="mapDisplayArea">
          <div id='sampleWrapper'>
            <img id='mypic'></img>
          </div>
          <div id="mapBorder" onMouseUp={() => {this.resizeMap()}}><div id="mapWrapper"></div></div>
        </div>
        <div id="boundsOptions">
          {selects[this.state.phase]}
          {nextButtons[this.state.phase]}
          <div><button class="tablinks" onClick={() =>this.setState({ phase: (this.state.phase > 0) ? this.state.phase - 1 : this.state.phase})}>Back!!</button></div>
        </div>
      </div>
    );
  }
}

export default App;
