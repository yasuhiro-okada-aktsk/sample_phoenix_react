jest.dontMock('../app');

import React from 'react/addons';
const App = require('../app');
var TestUtils = React.addons.TestUtils;

describe('routing', () => {

  it('change the page after click', () => {

    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    );

    var checkboxNode = React.findDOMNode(checkbox);

    // Verify that it's Off by default
    expect(checkboxNode.textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    TestUtils.Simulate.change(TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input'));
    expect(checkboxNode.textContent).toEqual('On');
  });

});