/** @jsx React.DOM */

'use strict';

var React = require('react');

var DecadeYear = require('./DecadeYear');
var dateutils = require('./dateutils');


var Decade = React.createClass({
  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    show: React.PropTypes.instanceOf(Date),
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      show: dateutils.startDecade(new Date())
    };
  },

  render: function () {
    var years = [];
    for (var i = 0; i < 10; i++) {
      years.push((
        <DecadeYear
          key={i}
          show={new Date(this.props.show.getFullYear() + i, 0, 1)}
          selected={this.props.selected}
          onSelect={this.props.onSelect}
          />
      ));
    }

    return (
      <div className="dtpicker-decade">
        {years}
      </div>
    );
  }
});


module.exports = Decade;

