import Relay from 'react-relay';
import React from 'react';

import Map from '../widgets/Map';

import ChangeTileTypeMutation from '../../mutations/ChangeTileTypeMutation';

class MapPage extends React.Component {
    render() {
        return (
            <Map tileset={this.props.tileset}/>
        );
    }
};

export default Relay.createContainer(MapPage, {
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
                availableTileTypes
            }
        `
    }
});