/** @jsx React.DOM */

'use strict';

var React = require('react');

var MonthCalendarControls = require('./MonthCalendarControls');
var YearCalendarControls = require('./YearCalendarControls');
var DecadeCalendarControls = require('./DecadeCalendarControls');
var CenturyCalendarControls = require('./CenturyCalendarControls');


var MODE_MAP = {
  'month': MonthCalendarControls,
  'year': YearCalendarControls,
  'decade': DecadeCalendarControls,
  'century': CenturyCalendarControls
};

var MODE_TRANSITIONS = {
  'month': 'year',
  'year': 'decade',
  'decade': 'century'
};



var CalendarControls = React.createClass({
  propTypes: {
    mode: React.PropTypes.string
  },

  onModeChange: function () {
    if (this.props.onModeChange) {
      if (this.props.mode in MODE_TRANSITIONS) {
        this.props.onModeChange(MODE_TRANSITIONS[this.props.mode]);
      }
    }
  },

  render: function () {
    var Controls = MODE_MAP[this.props.mode];

    return (
      <Controls
        show={this.props.show}
        onModeChange={this.onModeChange}
        onShowChange={this.props.onShowChange}
        />
    );
  }
});


module.exports = CalendarControls;

