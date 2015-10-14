import React from 'react'
import { Router, Route, Link } from 'react-router'

import SideMenu from './SideMenu.jsx'


export default React.createClass({
  componentDidMount: function () {
    this.buildSidebar();
  },
  buildSidebar: function() {
    // http://bootsnipp.com/snippets/featured/fancy-sidebar-navigation
    var trigger = $('.hamburger'),
      overlay = $('.overlay'),
      isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    }

    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    });
  },
  render: function () {
    return (
      <div id="wrapper">
        <div className="overlay"></div>
        <SideMenu />

        <div id="page-content-wrapper">
          <button type="button" className="hamburger is-closed" data-toggle="offcanvas">
            <span className="hamb-top"></span>
            <span className="hamb-middle"></span>
            <span className="hamb-bottom"></span>
          </button>

          <div className="container">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                          data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">Brand</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/page1">page1</Link></li>
                    <li><Link to="/page2">page2</Link></li>
                    <li><a href="/page1">page1 (server)</a></li>
                  </ul>

                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">Help <span className="caret"></span></a>
                      <ul className="dropdown-menu">
                        <li><a href="/static/help">Help</a></li>
                        <li><a href="/static/about">About</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
