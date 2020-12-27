import React, { Component } from 'react';
import NextButton from './Next.jsx';
import Overlay from './Overlay.jsx';
import SelectBorder from './SelectBorder.jsx';
import SelectSize from './SelectSize.jsx';
import SelectStyle from './SelectStyle.jsx';
import StyleTree from './StyleTree.jsx';
import ViewPoster from './ViewPoster.jsx';
import DefaultStyles from './DefaultStyles.jsx';
const urlCreator = window.URL || window.webkitURL;

const MAP_BORDER_WIDTH = 25;
const BORDER_PHASE = 0;
const SIZE_PHASE = 1;
const STYLE_PHASE = 2;
const FINAL_PHASE = 3;

/* Non-state global variabls: */
// Google Map for setting or viewing Poster area.
let gMap;
// URL of a downloaded poster.
let posterDownloadUrl;

/* Sets initial state to reasonable defaults or stored values. */
function getInitialState() {
  return {
    // Controls overall poster map creation app flow.
    phase: 0,
    // Whether to open the app Overlay component.
    expandOverlay: false,
    // Whether to show the style sample.
    showSample: false,
    // Unofficial lat/lng, zoom and center from initial set border.
    boundsRaw: false,
    // Official lat/lng and zoom from server analysis.
    bounds: false,
    // Whether to lock border selection dimensions to a set ratio.
    lock: false,
    // Ratio to optionally force on dimensions.
    ratio: { width: 3, height: 2 },
    // Pixel x & y of initial border, to be official ratio for setting min size.
    dimensions: { x: 0, y: 0 },
    // Units / dimensions: magic number to keep dimension ratio.
    unitDimensionScale: .01,
    // Pixels per Unit.
    resolution: 200,
    // Purely descriptive Unit - except Pixels, which forces resolution = 1.
    unit: 'Inches',
    // Nested style object to apply to poster.
    styleTree: StyleTree.getDefault(),
    // Map Type (satellite img vs map, etc).
    mapType: "roadmap",
    // Pre-loaded style objects to choose.
    savedStyles: getStoredStyles(),
  };
}

/* Merges locally-saved and server default style object options */
function getStoredStyles() {
  const storedStyles = JSON.parse(localStorage.getItem('styles'));
  return { ...DefaultStyles, ...storedStyles };
}

/* Entry point to the application. */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();

    // Bind App methods that may be passed as props.
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
    this.getSample = this.getSample.bind(this);
    this.openOverlay = this.openOverlay.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.toggleStyleTreeCollapse = this.toggleStyleTreeCollapse.bind(this);
    this.toggleStyleChoice = this.toggleStyleChoice.bind(this);
    this.hideSample = this.hideSample.bind(this);
    this.setMapType = this.setMapType.bind(this);
    this.saveMapStyle = this.saveMapStyle.bind(this);
    this.loadMapStyle = this.loadMapStyle.bind(this);
  }

  /* Retrieves a sample tile based on the current style and map location. */
  getSample() {
    const url = '/preview';
    const center = gMap.getCenter();
    const parcel = {
      lat: center.lat(),
      lng: center.lng(),
      height: this.state.bounds.height,
      width:  this.state.bounds.width,
      zoom: this.state.bounds.zoom,
      style: StyleTree.getStyleParams(this.state.styleTree),
      mapType: this.state.mapType,
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
          document.getElementById('sample-pic').src = urlCreator.createObjectURL(data);
          return this.setState({showSample: true});
        });
      }
      console.log("prollem");
      console.log(response);
      return Promise.reject(response.statusText);
    });
  }

  /* Calculates info on zoom, dimensions, geo range and tiles for given area. */
  getInfo() {
    const url = '/border';
    const parcel = {
      northWestLatLng: this.state.boundsRaw.northWestLatLng,
      southEastLatLng: this.state.boundsRaw.southEastLatLng,
      height: Math.round(this.getUnits().y * this.state.resolution),
      width:  Math.round(this.getUnits().x * this.state.resolution),
      lock: this.state.lock,
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

  /* Retrieves the final poster image. */
  submit() {
    const url = '/photo';
    const parcel = {
      northWestLatLng: this.state.boundsRaw.northWestLatLng,
      southEastLatLng: this.state.boundsRaw.southEastLatLng,
      height: Math.round(this.getUnits().y * this.state.resolution),
      width:  Math.round(this.getUnits().x * this.state.resolution),
      lock: this.state.lock,
      style: StyleTree.getStyleParams(this.state.styleTree),
      mapType: this.state.mapType,
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

        return response.blob().then(data => {
          console.log(data);
          return Promise.resolve(data);
        })
      }
      return Promise.reject(response.statusText);
    }).then((data) => {
      console.log(data);
      posterDownloadUrl = urlCreator.createObjectURL(data);
      document.getElementById('poster-image').src = posterDownloadUrl;
      this.setState({phase: FINAL_PHASE});
    });
  }

  toggleStyleTreeCollapse(node) {
    node.COLLAPSE = !node.COLLAPSE;
    this.setState({
      styleTree: StyleTree.highlight(JSON.parse(JSON.stringify(this.state.styleTree)))
    });
  }

  toggleStyleChoice(node, set, value) {
    node.SET = set;
    if (set) { node.VALUE = value}
    console.log(node, set, value);
    console.log(this.state.styleTree);
    this.setState({
      styleTree: StyleTree.highlight(JSON.parse(JSON.stringify(this.state.styleTree)))
    });
  }

  setMapType(style) {
    console.log("Setting map style: " + style);
    this.setState({
      mapType: style,
    });
  }

  saveMapStyle(name) {
    const savedStyles = JSON.parse(JSON.stringify(this.state.savedStyles));
    const style = JSON.parse(JSON.stringify(this.state.styleTree));
    StyleTree.collapse(style);
    savedStyles[name] = style;
    localStorage.setItem('styles', JSON.stringify(savedStyles));
    this.setState({ savedStyles: savedStyles });
  }

  loadMapStyle(style) {
    this.setState({
      styleTree: StyleTree.highlight(JSON.parse(JSON.stringify(style)))
    });
  }

  closeOverlay() {
    this.setState({ expandOverlay: false });
  }

  openOverlay() {
    this.setState({ expandOverlay: true });
  }

  hideSample() {
    this.setState({ showSample: false });
  }

  toggleRatioLock() {
    const lock = document.getElementById('lock-ratio');
    console.log(this.state.lock);
    if (this.state.lock) return this.setState({ lock: false });
    const dimensions = this.expandToFitRatio(this.state.dimensions, this.state.ratio);
    this.setState({ lock: true, dimensions });
  }

  getUnits() {
    // Rounded to nearest thousandth.
    return {
      x: (Math.round((this.state.dimensions.x * this.state.unitDimensionScale + Number.EPSILON) * 1000) / 1000),
      y: (Math.round((this.state.dimensions.y * this.state.unitDimensionScale + Number.EPSILON) * 1000) / 1000)
    }
  }

  updateUnitType(unit) {
    let unitDimensionScale = this.state.unitDimensionScale;
    let resolution = this.state.resolution;
    if (unit === "Pixels") {
      unitDimensionScale = unitDimensionScale * resolution;
      resolution = 1;
    }
    return this.setState({unit, unitDimensionScale, resolution});
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
    const unitDimensionScale = (width !== null) ? width / this.state.dimensions.x : height / this.state.dimensions.y;
    this.setState({unitDimensionScale});
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
    const gMap = document.getElementById('mapWrapper');
    console.log("Resize triggered.");

    const { height, width } = gMap.getBoundingClientRect();
    console.log("height = " + height, "width = " + width);
    if (!this.state.lock) return this.setState({ dimensions: {x: width, y: height} });
    const updatedDimensions = this.calculateMapResize(width, height);

    console.log("New Dimensions", updatedDimensions);
    console.log("Previous Dimensions", this.state.dimensions);
    this.setState({ dimensions: updatedDimensions });
  }

  /* Conditionally set map behavior based on Phase */
  setMapBehavior() {
    const restrictFullMap = this.state.phase >= STYLE_PHASE;
    const lockBorderMap = this.state.phase == SIZE_PHASE;
    const unlockMapInteraction = this.state.phase == BORDER_PHASE;

    let restriction = null;
    if (restrictFullMap) restriction = {
      latLngBounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(this.state.bounds.bounds.south.value, this.state.bounds.bounds.west.value),
        new google.maps.LatLng(this.state.bounds.bounds.north.value, this.state.bounds.bounds.east.value)),
      strictBounds: true
    };

    const mapOptions = {
      disableDefaultUI: (!unlockMapInteraction),
      draggable: (!lockBorderMap),
      restriction: restriction,
      minZoom: (restrictFullMap) ? this.state.bounds.zoom : null,
      maxZoom: (restrictFullMap) ? this.state.bounds.zoom: null,
    };
    if (restrictFullMap) mapOptions.zoom = this.state.bounds.zoom;

    gMap.setOptions(mapOptions);
  }

  /* Conditionally set map behavior based on Phase */
  setMapDisplay(mapWrapper, mapBorder) {
    const sample = document.getElementById('sample-pic');
    const poster = document.getElementById('poster-wrapper');

    const maximizeMap = this.state.phase >= STYLE_PHASE;
    const showSample = this.state.phase == STYLE_PHASE && this.state.showSample;
    const showPoster = this.state.phase == FINAL_PHASE;


    sample.style.display = (showSample) ? "inherit": "none";
    poster.style.display = (showPoster) ? "inherit": "none";

    if (maximizeMap) {
      mapBorder.style.width = '100%';
      mapBorder.style.height = '100%';
      mapWrapper.style.width = '100%';
      mapWrapper.style.height = '100%';
      mapWrapper.style.maxWidth = this.state.bounds.width + 'px';
      mapWrapper.style.maxHeight = this.state.bounds.height + 'px';
    } else {
      this.snapToDimensions(mapBorder);
      mapWrapper.style.maxWidth = '100%';
      mapWrapper.style.maxHeight = '100%';
      mapWrapper.style.maxWidth = 'calc(100% - 25px)';
      mapWrapper.style.maxHeight = 'calc(100% - 25px)';
    }
  }

  snapToDimensions(border) {
    border.style.width = this.state.dimensions.x + MAP_BORDER_WIDTH + 'px';
    border.style.height = this.state.dimensions.y + MAP_BORDER_WIDTH + 'px';
  }

  /* Derives map, wrapper and border state from app state. */
  syncMap() {
    const mapWrapper = document.getElementById('mapWrapper');
    const mapBorder = document.getElementById('mapBorder');
    if (!mapWrapper || !mapBorder || !gMap) return; // Ignore if not yet loaded.
    mapBorder.style.resize = (this.state.phase === BORDER_PHASE) ? "both" : 'none';
    this.setMapBehavior();
    this.setMapDisplay(mapWrapper, mapBorder);
  }

  componentDidUpdate() {
    this.syncMap();
  }

  componentDidMount() {
    const mapWrapper = document.getElementById('mapWrapper');
    const mapBorder = document.getElementById('mapBorder');

    // Initialize map to Sydney, Australia with basic settings.
    gMap = new google.maps.Map(mapWrapper, {
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

    // Start off map at half size of possible area.
    const { height, width } = document.getElementById('mapDisplayArea').getBoundingClientRect();
    console.log(height, width);
    mapBorder.style.height = height / 2 + 'px';
    mapBorder.style.width = width / 2 + 'px';
    mapBorder.style.resize = "both";
    mapBorder.style.overflow = "auto";

    // Bind Auto-Complete location search to map.
    // Assumes border selection Phase on component mount.
    const input = document.getElementById('pac-input');
    const center = document.getElementById('re-center');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setFields(['geometry.location', 'name']);
    const setCenterToPlace = () => {
      const place = autocomplete.getPlace();
      if (!place.geometry.location) {
        return window.alert(`No details available for input: ${place.name}`);
      }
      gMap.setCenter(place.geometry.location);
    }
    autocomplete.addListener('place_changed', setCenterToPlace);
    center.addEventListener('click', setCenterToPlace);

    // Persist map size info to state.
    this.resizeMap();
  }

  render() {
    console.log("App page rendering...")

    const selects = [
      <SelectBorder phase={1} ratio={this.state.ratio} updateRatio ={this.updateRatio} toggleRatioLock = {this.toggleRatioLock} lock = {this.state.lock}/>,
      <SelectSize phase={2} resolution = {this.state.resolution} updateResolution = {this.updateResolution} setUnits={this.setUnits} unit={this.state.unit} updateUnitType={this.updateUnitType} getUnits={this.getUnits}/>,
      <SelectStyle phase={3} tree={this.state.styleTree} collapseFunc={this.toggleStyleTreeCollapse} toggleStyleChoice={this.toggleStyleChoice} mapType={this.state.mapType} hideSample={this.hideSample} setMapType={this.setMapType} defaultStyles={this.state.savedStyles} loadMapStyle={this.loadMapStyle} saveMapStyle={this.saveMapStyle}/>,
      <ViewPoster phase={4} downloadUrl={posterDownloadUrl}/>
    ]

    const styleNexts = () => {
      return (
        <div>
          <NextButton text='Get a Sample!' click={() => this.getSample()}/>
          <NextButton text='Hide Sample!' click={() => this.hideSample()}/>
          <NextButton text='Get Poster Already!!' click={() => this.submit()}/>
        </div>
      )
    }

    const nextButtons = [
      <NextButton click={() => {
        const bounds = gMap.getBounds();
        this.setState({
          phase: SIZE_PHASE,
          boundsRaw: {
            center: gMap.getCenter(),
            zoom: gMap.getZoom(),
            northWestLatLng: {lat: bounds.getNorthEast().lat(), lng: bounds.getSouthWest().lng()},
            southEastLatLng: {lat: bounds.getSouthWest().lat(), lng: bounds.getNorthEast().lng()},
          },
        });
      }}/>,
      <NextButton test='Get It!!' click={() => this.getInfo()}/>,
      styleNexts(),
      <div></div>
    ]

    const decrementPhase = () => {
      if (this.state.phase == STYLE_PHASE) {
        console.log(this.state.boundsRaw);
        gMap.setOptions({
          restriction: null,
          minZoom: null,
          maxZoom: null,
          center: this.state.boundsRaw.center,
          zoom: this.state.boundsRaw.zoom,
        });
        console.log(gMap.getZoom());
      }
      return this.setState({
        phase: (this.state.phase > 0) ? this.state.phase - 1 : this.state.phase,
      })
    }

    const overlay = () => {
      if (this.state.expandOverlay) {
        return (
          <div>
            <Overlay closeOverlay={this.closeOverlay}/>
          </div>
        )
      }
    }

    return (
      <div id="boundsContainer">
        {overlay()}
        <div id="mapDisplayArea">
          <div id='poster-wrapper'>
            <img id='poster-image'></img>
          </div>
          <div id='sampleWrapper'>
            <img id='sample-pic'></img>
          </div>
          <div id="mapBorder" onMouseUp={() => {this.resizeMap()}}>
            <div id="mapWrapper"></div>
          </div>
        </div>
        <div id="boundsOptions">
          {selects[this.state.phase]}
          {nextButtons[this.state.phase]}
          <div>
            <button class="tablinks" onClick={decrementPhase}>
              Go Back
            </button>
            <button class="tablinks" onClick={this.openOverlay}>
              Open Overlay
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
