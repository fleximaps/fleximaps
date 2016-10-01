import Relay from 'react-relay';
import React from 'react';

import styles from './MapPage.css';
import Map from '../widgets/Map';
import CSSModules from 'react-css-modules';

import ChangeTileTypeMutation from '../../mutations/ChangeTileTypeMutation';

class MapPage extends React.Component {
    render() {
        return (
            <Map tileset={this.props.tileset} onTileClicked={this._handleTileClicked.bind(this)}/>
        );
    }
    _handleTileClicked(tile){
        const newTileType = (tile.type + 1) % this.props.tileset.availableTileTypes;

        this.props.relay.commitUpdate(
            new ChangeTileTypeMutation({
                tile: tile,
                tileType: newTileType
            })
        );
    }
}

const MapPageCss = CSSModules(MapPage, styles);

export default Relay.createContainer(MapPageCss, {
    fragments: {
        tileset: () => Relay.QL`
            fragment on Tileset{
                tiles {
                    col,
                    row,
                    type,
                    ${ChangeTileTypeMutation.getFragment('tile')}
                },
                numCols,
                numRows,
                availableTileTypes,
                isHexagonal
            }
        `
    }
});