/** @jsx React.DOM */

'use strict';

var React = require('react');

var YearMonth = require('./YearMonth');
var dateutils = require('./dateutils');


var Year = React.createClass({
  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    show: React.PropTypes.instanceOf(Date),
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      show: dateutils.startYear(new Date())
    };
  },

  render: function () {
    var months = [];
    for (var i = 0; i < 12; i++) {
      months.push((
        <YearMonth
          key={i}
          show={new Date(this.props.show.getFullYear(), i, 1)}
          selected={this.props.selected}
          onSelect={this.props.onSelect}
          />
      ));
    }

    return (
      <div className="dtpicker-year">
        {months}
      </div>
    );
  }
});


module.exports = Year;

