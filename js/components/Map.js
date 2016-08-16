import React from 'react';
import Relay from 'react-relay';

class Map extends React.Component {
    render() {
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
                                    <select readOnly={true} value={tile.type}>
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
}

export default Relay.createContainer(Map, {
    fragments: {
        tileset: () => Relay.QL`
            fragment on Tileset {
                rows{
                    id,
                    tiles {
                        id,
                        type
                    },
                },
                availableTileTypes
            }
        `
    }
});
