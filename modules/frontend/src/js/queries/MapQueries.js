import Relay from 'react-relay';

export default {
    tileset: () => Relay.QL`
        query {
            tileset
        }
    `,
};