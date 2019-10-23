import React, { Component } from 'react';
const urlCreator = window.URL || window.webkitURL;

function getInitialState() {
  return {
    phase: 0,
    bounds: false,
    lock: false,
    dimensions: { width: 1, height: 1 },
    stretch: { x: 100, y: 100, z: 100 },
    range: { x: false, y: false },

    img: false // stores image data
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: false};

    // Binding methods
    //this.setMap = this.setMap.bind(this);
  }

  componentDidMount() {
    // return this.setMap()
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
    // const myblock = (
    //   <div id="myblock"></div>
    // );
    // const g = document.createElement('div');
    // g.setAttribute("id", "myblock");
    // const map = new google.maps.Map(myblock, {
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
        <div id="boundsArea"><div id="myblock"></div></div>
        <div id="boundsOptions"></div>
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
