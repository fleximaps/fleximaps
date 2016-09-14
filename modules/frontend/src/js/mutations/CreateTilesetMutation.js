import Relay from 'react-relay';

export default class CreateTilesetMutation extends Relay.Mutation {
    static fragments = {
        tileset: () => Relay.QL`
            fragment on Tileset {
                id,
                numCols,
                numRows,
                availableTileTypes
            }
        `
    };
    getMutation() {
        return Relay.QL`mutation{createTileset}`;
    }
    getFatQuery() {
        return Relay.QL`
            fragment on CreateTilesetMutationPayload {
                tileset {
                    id,
                    numCols,
                    numRows,
                    availableTileTypes
                }
            }
        `;
    }
    getVariables() {
        return {
            numCols: this.props.numCols,
            numRows: this.props.numRows
        };
    }
}