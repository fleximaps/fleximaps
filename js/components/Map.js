import React from 'react';
import Relay from 'react-relay';

class Map extends React.Component {
  render() {
    return (
      <div>
        <h1>Tileset</h1>
        <table>
          <tbody>
            {this.props.tileset.rows.map(row =>
              <tr key={row.id}>
                {row.tiles.map(tile =>
                    <td key={tile.id}>{tile.type}</td>
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
      }
    `,
  },
});
