import MapFacade from '../../map/MapFacade';
import OrthogonalFormat from '../../map/format/orthogonal/OrthogonalFormat';

import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './Map.css';

class Map extends React.Component {
    constructor(){
        super();

        this._oldProps = {
            tileset: {
                availableTileTypes: 0,
                tiles: []
            }
        };

        this._mapFacade = null;
    }
    render() {
        const component = this;

        if(this._mapFacade !== null){
            this._update();
        }

        return (
            <canvas styleName='map' ref="mapRef"></canvas>
        );
    }
    _update(){
        this._mapFacade.setTileTypes(this.props.tileset.availableTileTypes);
        this._updateTiles();
    }
    _updateTiles(){
        const component = this;
        const mapFacade = this._mapFacade;

        this._updateSize();

        const tiles = this.props.tileset.tiles;
        tiles.forEach(function(currTile, tileIdx){
            mapFacade.setTileType(currTile.col, currTile.row, currTile.type);
        });
    }
    _updateSize(){
        const numRows = this.props.tileset.numRows;
        const numCols = this.props.tileset.numCols;

        this._mapFacade._setSize(numCols, numRows);
    }
    _onTileClicked(numCol, numRow){
        const tile = this.props.tileset.tiles[this._getTileIdx(numCol, numRow)];

        this.props.onTileClicked(tile);
        this.props.onTileClicked(tile);
    }
    _getTileIdx(numCol, numRow){
        const numCols = this.props.tileset.numCols;

        return numCols * numRow + numCol;
    }
    componentDidMount(){
        const mapRef = this.refs.mapRef;

        this._initMap(mapRef);
        this._update();
        mapRef.focus();

        this._mapFacade.centerCamera();
    }
    _initMap(canvas){
        const mapFacade = new MapFacade(canvas, new OrthogonalFormat());
        mapFacade.start();
        this._mapFacade = mapFacade;

        // Watch for browser/canvas resize events
        window.addEventListener('resize', function () {
            mapFacade.resize();
        });

        this._mapFacade.setTileClickedListener(this._onTileClicked.bind(this));
    }
    componentWillUnmount(){
        const engine = this._engine;
        engine.dispose();
    }
    shouldComponentUpdate(nextProps, nextState) {
        this._oldProps = nextProps;

        return true;
    }
}

Map.propTypes = {
    onTileClicked: React.PropTypes.func.isRequired
};

export default CSSModules(Map, styles);