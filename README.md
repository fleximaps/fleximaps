#FlexiMaps online map editor

##Overview

This is a learning project that I used for lerning relay and WebGL.

FlexiMaps allows creating, editing, exporting and importing hexagonal and rectangular tile maps.

##Screenshots
![Maps list](https://github.com/fleximaps/fleximaps/raw/master/docs/imgs/maps-list.png "Maps list")
![Hexagonal map](https://github.com/fleximaps/fleximaps/raw/master/docs/imgs/hexagonal-map.png "Hexagonal map")
![Hexagonal map big](https://github.com/fleximaps/fleximaps/raw/master/docs/imgs/hexagonal-map-big.png "Hexagonal map big")
![Tile map](https://github.com/fleximaps/fleximaps/raw/master/docs/imgs/rect-map.png "Tile map")

##Getting started
###Requirements:
* MongoDB
* NodeJS
* Web Browser (Firefox or Chrome should be fine.)

###Compiling
####Instal gulp
* `npm install -g gulp`

####Compile the graphql module
* `cd modules/graphql`
* `npm install`
* `gulp`

####Compile the frontend module
* `cd modules/frontend`
* `npm install`
* `gulp`

####Compile the webserver and copy the "frontend" assets  
* `cd modules/webserver `
* `npm install`
* `gulp`

###Run
* Start your MongoDB server (listening on localhost)
* Start the graphql-server `node modules/graphql/build/server.js`
* Start the webserver `node modules/graphql/build/server.js`
* Open your browser and open `http://localhost:3000`
* Have fun!
