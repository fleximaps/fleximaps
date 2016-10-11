import Relay from 'react-relay';

export default class ImportTilesetMutation extends Relay.Mutation {
    static fragments = {};
    getMutation() {
        return Relay.QL`mutation{importTileset}`;
    }
    getFatQuery() {
        return Relay.QL`
            fragment on ImportTilesetMutationPayload @relay(pattern: true){
                tileset
            }
        `;
    }
    getConfigs() {
        return [{
            type: 'REQUIRED_CHILDREN',
            children: [
                    Relay.QL`
                    fragment on ImportTilesetMutationPayload {
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
            isHexagonal: this.props.isHexagonal,
            tileTypes: this.props.tileTypes
        };
    }
}