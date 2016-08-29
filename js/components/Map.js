import MapFacade from '../map/MapFacade';
import OrthogonalFormat from '../map/format/orthogonal/OrthogonalFormat';

import React from 'react';
import Relay from 'react-relay';

import ChangeTileTypeMutation from '../mutations/ChangeTileTypeMutation';

class Map extends React.Component {
    constructor(){
        super();

        this._oldProps = {
            tileset: {
                availableTileTypes: 0,
                rows: []
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
            <canvas className="map" ref="mapRef"></canvas>
        );
    }
    _update(){
        this._mapFacade.setTileTypes(this.props.tileset.availableTileTypes);
        this._updateTiles();
    }
    _updateTiles(){
        const component = this;

        this._updateSize();

        const rows = this.props.tileset.rows;
        rows.forEach(function(currRow, rowIdx){
            component._updateRow.apply(component, [currRow, rowIdx]);
        });
    }
    _updateSize(){
        const rows = this.props.tileset.rows;

        const numRows = rows.length;
        const numCols = (numRows === 0)?0:rows[0].tiles.length;

        this._mapFacade._setSize(numCols, numRows);
    }
    _updateRow(row, rowIdx){
        const component = this;

        const mapFacade = this._mapFacade;
        const tiles = row.tiles;

        tiles.forEach(function(tile, tileIdx){
            mapFacade.setTileType(tileIdx, rowIdx, tile.type);
        });
    }
    _handleTileClicked(numCol, numRow){
        const tile = this.props.tileset.rows[numRow].tiles[numCol];
        const newTileType = (tile.type + 1) % this.props.tileset.availableTileTypes;

        this.props.relay.commitUpdate(
            new ChangeTileTypeMutation({
                tile: tile,
                tileType: newTileType
            })
        );
    }
    componentDidMount(){
        const mapRef = this.refs.mapRef;

        this._initMap(mapRef);
        this._update();
        mapRef.focus();
    }
    _initMap(canvas){
        const mapFacade = new MapFacade(canvas, new OrthogonalFormat());
        mapFacade.start();
        this._mapFacade = mapFacade;

        // Watch for browser/canvas resize events
        window.addEventListener('resize', function () {
            mapFacade.resize();
        });

        this._mapFacade.setTileClickedListener(this._handleTileClicked.bind(this));
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

export default Relay.createContainer(Map, {
    fragments: {
        tileset: () => Relay.QL`
            fragment on Tileset {
                rows{
                    id,
                    tiles {
                        id,
                        type,
                        ${ChangeTileTypeMutation.getFragment('tile')}
                    },
                },
                availableTileTypes
            }
        `
    }
});
