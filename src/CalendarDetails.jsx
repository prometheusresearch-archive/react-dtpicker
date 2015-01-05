/** @jsx React.DOM */

'use strict';

var React = require('react');

var Month = require('./Month');
var Year = require('./Year');
var Decade = require('./Decade');
var Century = require('./Century');
var dateutils = require('./dateutils');


var MODE_MAP = {
  'month': [Month, dateutils.startMonth],
  'year': [Year, dateutils.startYear],
  'decade': [Decade, dateutils.startDecade],
  'century': [Century, dateutils.startCentury]
};

var MODE_TRANSITIONS = {
  'year': 'month',
  'decade': 'year',
  'century': 'decade'
};


var CalendarDetails = React.createClass({
  propTypes: {
    mode: React.PropTypes.string,
    selected: React.PropTypes.instanceOf(Date),
    show: React.PropTypes.instanceOf(Date),
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      mode: 'month',
      show: new Date()
    };
  },

  onSelect: function (date) {
    if (this.props.onShowChange) {
      this.props.onShowChange(date);
    }
    if (MODE_TRANSITIONS[this.props.mode]) {
      if (this.props.onModeChange) {
        this.props.onModeChange(MODE_TRANSITIONS[this.props.mode]);
      }
    }
    if (this.props.mode === 'month') {
      if (this.props.onSelect) {
        this.props.onSelect(date);
      }
    }
  },

  render: function () {
    var Details = MODE_MAP[this.props.mode][0];
    var dateInitializer = MODE_MAP[this.props.mode][1];

    return (
      <div className="dtpicker-calendarDetails">
        <Details
          show={dateInitializer(this.props.show)}
          selected={this.props.selected}
          onSelect={this.onSelect}
          />
      </div>
    );
  }
});


module.exports = CalendarDetails;

