/** @jsx React.DOM */

'use strict';

var React = require('react');

var CenturyDecade = require('./CenturyDecade');
var dateutils = require('./dateutils');


var Century = React.createClass({
  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    show: React.PropTypes.instanceOf(Date),
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      show: dateutils.startCentury(new Date())
    };
  },

  render: function () {
    var decades = [];
    for (var i = 0; i < 10; i++) {
      decades.push((
        <CenturyDecade
          key={i}
          show={new Date(this.props.show.getFullYear() + (i * 10), 0, 1)}
          selected={this.props.selected}
          onSelect={this.props.onSelect}
          />
      ));
    }

    return (
      <div className="dtpicker-century">
        {decades}
      </div>
    );
  }
});


module.exports = Century;

