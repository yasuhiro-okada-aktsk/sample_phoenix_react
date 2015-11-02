import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../../actions';
import FeedAdd from '../../components/feed/FeedAdd.jsx'

export default class FeedAddPage extends Component {
  handleSubmit(url) {
    if (!url) {
      alert('empty!');
      return;
    }

    this.props.feedAdd(url);
  }

  render() {
    return (
      <FeedAdd onSubmit={::this.handleSubmit}/>
    );
  }
}


FeedAddPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedAddPage);
