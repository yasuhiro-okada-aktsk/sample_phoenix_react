import React, { Component, PropTypes } from 'react';

export default class FeedAdd extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.refs.url.value);
  }

  render() {
    return (
      <div>
        <div className="col-xs-1"></div>
        <form className="col-xs-8" onSubmit={::this.handleSubmit}>
          <div className="form-group">
            <label>Feed</label>
            <input type="text" placeholder="Feed" className="form-control" ref="url"/>
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    );
  }
}

FeedAdd.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
