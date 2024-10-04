# My Map Poster App

## For Users

### What even is this?
My Map Poster App is a web app for creating poster-quality maps. It stitches together Google Maps tiles to generate a much higher-resolution composite image than Google is willing to give you directly - much better than taking a screenshot of a Google Maps search, or of rendering (even the largest possible) single Tile from the static maps API. I made it because I think maps are neat, and this was the functionality I wanted for myself.

### How do I use it?
There are three steps to making your map:
1. Define the map area. You can search for a city or landmark to jump straight there, then expand/contract the border, drag the center and zoom in or out to capture exactly the area you want.
2. Define the image size (based on your desired poster dimensions)
3. Style the map. Choose from a set of preset map styles, or use the drilldown `Customize Styling` menu to configure exactly how your map looks. You can do anything from changing color schemes to choosing which type of landmarks and features are visible. See the [static map styling guide](https://developers.google.com/maps/documentation/maps-static/styling) for specifics. You can get a sample of your map to see how your styling looks - but you won't see the whole thing, because we don't want to waste quota pulling down the full set of styled Tiles.

Instructions are visible in the app itself - it's not the cleanest interface, but it is generally functional. If something seems broken, file a bug!

### Where can I use it?
The app is hosted with Google App Engine at https://pancake-mafia.appspot.com/

## For Devs

### How does it work?
The structure should be pretty familiar for those who use Node and/or React.

The `/client` directory is a pretty typical React app.

The `/server` directory is a pretty typical Express app, focused mostly on converting between geodetic and langitude/longitude coordinates to calculate how many tile to stitch together and what their center location and zoom levels should be. It also makes heavy use of the [maps static api](https://developers.google.com/maps/documentation/maps-static/overview) and [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 

### How can I play around with it on my own?
1. Clone it to your computer. There's lots of guides online for "cloning a repo from github".
2. Add an API key with the relevant permissions from Google Cloud Platform - this will allow you to make requests to the static map API, among others. Detailed instructions are outside the scope of this readme, but I'll convey the gist. You'll need to set up a GCP account and create a project, then `Enable APIs and Services` for certain Google Maps APIs (not sure exactly which are strictly necessary, but I have `Maps JavaScript API`, `Maps Static API`, and `Places API` - among others). Once that is done, you'll need to create an API Key that allows all these services (`APIs and Services` -> `Credentials` -> `Create Credentials`) and copy this to a file you add under `./public/key.txt` in the source tree.
3. Make sure you have `npm`, then try building and running the project with `npm run build` and `npm start`. And maybe `npm install` first. The file to note here is `package.json` - which configures the dependencies, source structure, app entrypoint, and `npm run` options. Greater detail is outside the scope of this readme.
4. Mess around with the code, break things, and see what went wrong by opening the `Developer tools console` on the webpage and looking for error messages in the console where you ran your npm command. Using `npm run dev` is recommended, so error messages are less opaque.

### How can I host my own instance?
This is a simplified overview - hopefully at least enough so I can figure it out if I need to re-deploy.

1. Create a new App Engine app in the same project as your API key. (No need if one exists already.)
2. Pull down the code (`git clone`), and make sure your API key file is added appropriately (`./public/key.txt`). Then add an `./app.yaml` file with a line specifying the node runtime (`runtime: nodejs20`).
3. Use the GCloud CLI to deploy your project. See https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/main/appengine#deploying

### Can I contribute?
You can clone this and host your own repo if you'd like. I'm unlikely to be actively merging anything here.
