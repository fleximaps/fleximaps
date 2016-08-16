import React from 'react';
import Relay from 'react-relay';

import ChangeTileTypeMutation from '../mutations/ChangeTileTypeMutation';

class Map extends React.Component {
    render() {
        const component = this;

        const tileset = this.props.tileset;
        return (
            <div>
                <h1>Tileset</h1>
                <table>
                    <tbody>
                    {tileset.rows.map(row =>
                        <tr key={row.id}>
                            {row.tiles.map(tile =>
                                <td key={tile.id}>
                                    <select value={tile.type} onChange={function(event){
                                        const newTileType = event.target.value;
                                        component._onTileTypeChanged.apply(component, [tile, newTileType]);
                                    }}>
                                        {tileset.availableTileTypes.map(availableTileType =>
                                            <option key={availableTileType} value={availableTileType}>{availableTileType}</option>
                                        )}
                                    </select>
                                </td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
    _onTileTypeChanged(tile, newTileType){
        this.props.relay.commitUpdate(
            new ChangeTileTypeMutation({
                tile: tile,
                tileType: newTileType
            })
        );
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
