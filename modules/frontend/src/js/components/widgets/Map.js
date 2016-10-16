import MapFacade from '../../map/MapFacade';
import OrthogonalFormat from '../../map/format/orthogonal/OrthogonalFormat';
import HexagonalFormat from '../../map/format/hexagonal/HexagonalFormat';

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
            <div styleName='mapWrapper'>
                <canvas styleName='map' ref="mapRef"></canvas>
                <div styleName='sidePanel'>
                    <button styleName='slidePanelButton exportButton' type="button" onClick={this._onExportClicked.bind(this)}>
                        Download
                    </button>
                </div>
            </div>
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
        const mapFormat = this._getFormat();
        const mapFacade = new MapFacade(canvas, mapFormat);
        mapFacade.start();
        this._mapFacade = mapFacade;

        // Watch for browser/canvas resize events
        window.addEventListener('resize', function () {
            mapFacade.resize();
        });

        this.refs.mapRef.onselectstart = function () { return false; }

        this._mapFacade.setTileClickedListener(this._onTileClicked.bind(this));
    }
    _getFormat(){
        let format = null;

        if(this.props.tileset.isHexagonal){
            format = new HexagonalFormat();
        }else{
            format = new OrthogonalFormat();
        }

        return format;
    }
    componentWillUnmount(){
        const engine = this._engine;
        engine.dispose();
    }
    shouldComponentUpdate(nextProps, nextState) {
        this._oldProps = nextProps;

        return true;
    }
    _onExportClicked(){
        this._mapFacade.createScreenshot();
    }
}

Map.propTypes = {
    onTileClicked: React.PropTypes.func.isRequired
};

export default CSSModules(
    Map,
    styles,
    {
        allowMultiple: true
    }
);
