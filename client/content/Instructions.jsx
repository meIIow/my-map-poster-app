import React, { Component } from 'react';

/* Instructions for Phase 1: Border Selection*/
const borderCenterText =
  `Start by choosing a general location for your map - use the geolocation text input to reset the map view. You can re-center the map to this spot at any time.`
const borderSetText = `Next, set the borders of your eventual poster. To do this:`
const borderSetList = [
  'Consider locking the map to a specific ratio, e.g. 3:2 for an 18- by 12- inch poster',
  'Drag on the map itself to adjust the center location',
  'Drag the map\'s frame to increase or decrease the area the map will contain',
  'Adjust the zoom level to get the entirety of your intended area in frame - the actual zoom level of your final map will be determined by the resolution info you choose later',
];
const borderNote = 'For now, just focus on capturing the area you would like your map to display - no need to worry about icons, styling, labels or resolution.'
const setBorderInstructions = () => {
  return (
      <div>
        <h3> Instructions: Select the Map Area</h3>
        <div>Welcome!</div>
        <br/>
        <div>{borderCenterText}</div>
        <br/>
        <div>{borderSetText}</div>
        <ul>
          {borderSetList.map((instruction) => {
            return (
              <li>
                {instruction}
              </li>
            )
          })}
        </ul>
        <div>{borderNote}</div>
      </div>
  );
}

/* Instructions for Phase 2: Resolution Selection*/
const mapResolutionText =
  'Now choose the (minimum) size of your map. Either enter Pixel dimension directly, or specify the dimensions in units and choose a pixel density.';
const mapResolutionNote = 'Note that the actual units you use are purely descriptive: what matters is pixels-per-unit.';
const mapResolutionClarification =
  'The resulting map will be at least the resolution specified, and will adhere to the borders and ratio from the previous step.'
const setResolutionInstructions = () => {
  return (
      <div>
        <h3> Instructions: Select the Map Resolution</h3>
        <div>{mapResolutionText}</div>
        <br/>
        <div>{mapResolutionNote}</div>
        <br/>
        <div>{mapResolutionClarification}</div>
      </div>
  );
}

/* Instructions for Phase 3: Styling */
const styleOverviewText =
  `Finally, it's time to customize the appearance of your map.`
const stylingSampleText =
  `Choose 'Show Sample' to superimpose a stlyed map tile for the current styling snapshot. The underlying full, interactable map has the same boundaries, zoom level and resolution as your final map - you can drag around this map to verify that it covers the area that you expect, or to change the center point of the styling sample tile, but we cannot show styling on this map itself.`;
const mapTypeText =
  `The most important step is to choose the map type: roadmap, satellite, hybrid (satellite with road & location annotations), or terrain. Note that the Hybrid/Map toggle on the map itself just controls the interacterable map - the radio buttons on the right control your official specifications.`
const defaultStylingText = `To get started quickly, you can choose from a selection of pre-loaded styles. Custom styles can be added on top of this if desired. If you create a set of style specs that you like, you can save it - this makes it available for selection if you make another map.`
const customStylingText1 = `We provide a UI for adding custom styles, but see `;
const styleUrl = `https://developers.google.com/maps/documentation/maps-static/styling`;
const customStylingText2 = ` for details on what the stlying options mean.`;
const setStylingInstructions = () => {
  return (
      <div>
        <h3> Instructions: Style the Map</h3>
        <div>{styleOverviewText}</div>
        <br/>
        <div>{stylingSampleText}</div>
        <br/>
        <div>{mapTypeText}</div>
        <br/>
        <div>{defaultStylingText}</div>
        <br/>
        <div>{customStylingText1}<a href={styleUrl}>the google style docs</a>{customStylingText2}</div>
      </div>
  );
}

const Instructions = {
  displays: [
    setBorderInstructions,
    setResolutionInstructions,
    setStylingInstructions,
    () => null,
  ],
};

export default Instructions;
