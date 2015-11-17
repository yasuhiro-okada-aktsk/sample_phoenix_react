import Relay from 'react-relay';

export default class extends Relay.Route {
  static path = '/';
  static queries = {
    feeds: () => Relay.QL`query { feeds(count: 5) }`,
  };
  static routeName = 'AppHomeRoute';
}
