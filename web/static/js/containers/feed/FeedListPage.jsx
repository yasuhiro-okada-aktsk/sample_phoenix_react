import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../../actions';

class FeedListPage extends Component {
  componentDidMount() {
    this.props.feedGet();
  }

  render() {
    return (
      <div>list</div>
    );
  }
}


FeedListPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedListPage);
