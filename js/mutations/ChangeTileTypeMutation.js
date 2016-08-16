import Relay from 'react-relay';

export default class ChangeTileTypeMutation extends Relay.Mutation {
    static fragments = {
        tile: () => Relay.QL`
            fragment on Tile {
                id
            }
        `
    };
    getMutation() {
        return Relay.QL`mutation{changeTileType}`;
    }
    getCollisionKey() {
        return `this.props.tile.id`;
    }
    getFatQuery() {
        return Relay.QL`
            fragment on ChangeTileTypeMutationPayload {
                tile {
                    type
                }
            }
        `;
    }
    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                tile: this.props.tile.id
            }
        }];
    }
    getVariables() {
        return {
            id: this.props.tile.id,
            tileType: this.props.tileType
        };
    }
    getOptimisticResponse() {
        return {
            tile: {
                id: this.props.tile.id,
                type: this.props.tileType
            }
        };
    }
}