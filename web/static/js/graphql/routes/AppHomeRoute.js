import Relay from 'react-relay';

export default class extends Relay.Route {
  static path = '/';
  static queries = {
    feedList: () => Relay.QL`query { feedList }`,
  };
  static routeName = 'AppHomeRoute';
}
