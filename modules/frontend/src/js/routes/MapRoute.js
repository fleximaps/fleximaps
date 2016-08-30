import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    tileset: () => Relay.QL`
      query {
        tileset
      }
    `,
  };
  static routeName = 'MapRoute';
}
