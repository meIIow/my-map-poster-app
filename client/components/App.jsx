import React, { Component } from 'react';
const urlCreator = window.URL || window.webkitURL;

const MAP_BORDER_WIDTH = 25;
let myMap;
let bounds;
let center;

function getInitialState() {
  return {
    phase: 0,
    bounds: false,
    lock: false,
    mult: {ratio: 1, dimensions: 1},
    withUnits: false,
    ratio: { width: 3, height: 2 },
    units: { width: 1, height: 1},
    resolution: 200,
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
    this.setUnits = this.setUnits.bind(this);
    this.setWithUnits = this.setWithUnits.bind(this);
    this.updateResolution = this.updateResolution.bind(this);
    this.updatePixels = this.updatePixels.bind(this);
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
    const x = myMap.getCenter();
    console.log(x.lat(), x.lng(), center.lat(), center.lng());

    const parcel = {
      lat: center.lat(),
      lng: center.lng(),
      height: this.state.bounds.height,
      width:  this.state.bounds.width,
      zoom: this.state.bounds.zoom,
    };
    console.log("abc");
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
          const mapBorder = document.getElementById('mapBorder');
          mapBorder.style.visibility = "hidden";
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
    center = myMap.getCenter();

    bounds = x;
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
        console.log(response);
        return response.json();
      }
      return Promise.reject(response.statusText);
    }).then((json) => {
      console.log(json);
      const b = json.bounds;
      const mapWrapper = document.getElementById('mapWrapper');
      const mapBorder = document.getElementById('mapBorder');
      mapBorder.style.width = '100%';
      mapBorder.style.height = '100%';
      mapWrapper.style.width = '100%';
      mapWrapper.style.height = '100%';
      mapWrapper.style.maxWidth = json.width + 'px';
      mapWrapper.style.maxHeight = json.height + 'px';
      mapBorder.style.resize = 'none';
      console.log(parcel, json.bounds);
      myMap.setOptions({
        restriction: {
          latLngBounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(b.south.value, b.west.value),
            new google.maps.LatLng(b.north.value, b.east.value)),
          strictBounds: true
        },
        zoom: json.zoom,
        minZoom: json.zoom,
        maxZoom: json.zoom,
      });
      this.setState({bounds: json, phase: 1});
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
    if (this.state.lock) return this.setState({ lock: false });
    const dimensions = this.expandToFitRatio(this.state.dimensions, this.state.ratio);
    this.setState({ lock: true, dimensions });
  }

  updatePixels(width, height) {
    const ratioMult = (width !== null) ? width / this.state.ratio.width / this.state.resolution: height / this.state.ratio.height / this.state.resolution;
    const dimensionMult = (width !== null) ? width / this.state.dimensions.x : height / this.state.dimensions.y;
    if (!this.state.lock) return this.setState({mult: {ratio: this.state.mult.ratio, dimensions: dimensionMult}});
    this.setState({mult: {dimensions: this.state.mult.dimensions, ratio: ratioMult}});
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
    const ratioMult = (width !== null) ? width / this.state.ratio.width : height / this.state.ratio.height;
    const dimensionMult = (width !== null) ? width / this.state.dimensions.x * this.state.resolution: height / this.state.dimensions.y * this.state.resolution;
    if (!this.state.lock) return this.setState({mult: {ratio: this.state.mult.ratio, dimensions: dimensionMult}});
    this.setState({mult: {dimensions: this.state.mult.dimensions, ratio: ratioMult}});
  }

  setWithUnits(boo) {
    this.setState({withUnits: boo});
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

    return (
      <div id="boundsContainer">
        <div id="mapDisplayArea"><div><img id='mypic'></img></div><div id="mapBorder" onMouseUp={() => {this.resizeMap()}}><div id="mapWrapper"></div></div></div>
        <div id="boundsOptions">
          <input id="pac-input" type="text" placeholder="Enter a location"></input>
          <input id="re-center" type="button" value="Re-Center Map"></input>
          <div>width:</div>
          <input type="number" id="width" min="1" value={this.state.ratio.width} onInput={(event) => {this.updateRatio(event.target.value, false)}}></input>
          <div>height:</div>
          <input type="number" id="height" min="1" value={this.state.ratio.height} onInput={(event) => {this.updateRatio(false, event.target.value)}}></input>
          <div>lock ratio:</div>
          <label class="switch">
            <input id="lock-ratio" type="checkbox" value = {this.state.lock} onClick={() => this.toggleRatioLock()}></input>
            <span class="slider round"></span>
          </label>
          <div class="tab">
            <button class={`tablinks${this.state.withUnits ? ' active' : ''}`} onClick={() => this.setWithUnits(true)}>Units & Resolution</button>
            <button class={`tablinks${!this.state.withUnits ? ' active' : ''}`} onClick={() => this.setWithUnits(false)}>Pixel Dimensions</button>
          </div>
          <div>
            <div class="halfsies">width units:
              <input type="number" disabled={!this.state.withUnits} class="units" id="width-units" min="0" onInput={(e)=> this.setUnits(e.target.value, null)} value={(this.state.lock) ? this.state.ratio.width * this.state.mult.ratio : this.state.dimensions.x * this.state.mult.dimensions / this.state.resolution}></input>
            </div>
            <div class="halfsies">height units:
              <input type="number" disabled={!this.state.withUnits} class="units" id="height-units" min="0" onInput={(e)=> this.setUnits(null, e.target.value)} value={(this.state.lock) ? this.state.ratio.height * this.state.mult.ratio : this.state.dimensions.y * this.state.mult.dimensions / this.state.resolution}></input>
            </div>
            <div>Pixel Density:<input type="number" disabled={!this.state.withUnits} value={this.state.resolution} min="0" step="50" onInput={(e)=> this.updateResolution(e.target.value)}></input></div>
          </div>
          <div>width-pixels:</div>
          <input type="number" disabled={this.state.withUnits} id="width-pixels" min="1" value={Math.round((this.state.lock) ? this.state.ratio.width * this.state.mult.ratio  * this.state.resolution : this.state.dimensions.x * this.state.mult.dimensions)} onInput={(e)=> this.updatePixels(e.target.value, null)}></input>
          <div>height-pixels:</div>
          <input type="number" disabled={this.state.withUnits} id="height-pixels" min="1" value={Math.round((this.state.lock) ? this.state.ratio.height * this.state.mult.ratio * this.state.resolution : this.state.dimensions.y * this.state.mult.dimensions)} onInput={(e)=> this.updatePixels(null, e.target.value)}></input>
          <div><button class="tablinks" onClick={() => this.infoOrSample()}>Get It!!</button></div>
        </div>
      </div>
    );
  }
}

export default App;
