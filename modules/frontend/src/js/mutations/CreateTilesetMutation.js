import Relay from 'react-relay';

export default class CreateTilesetMutation extends Relay.Mutation {
    static fragments = {};
    getMutation() {
        return Relay.QL`mutation{createTileset}`;
    }
    getFatQuery() {
        return Relay.QL`
            fragment on CreateTilesetMutationPayload @relay(pattern: true){
                tileset
            }
        `;
    }
    getConfigs() {
        return [{
            type: 'REQUIRED_CHILDREN',
            children: [
                    Relay.QL`
                    fragment on CreateTilesetMutationPayload {
                        tileset
                    }
                `
            ]
        }];
    }
    getVariables() {
        return {
            numCols: this.props.numCols,
            numRows: this.props.numRows,
            isHexagonal: this.props.isHexagonal
        };
    }
}