/** @jsx React.DOM */

'use strict';

var React = require('react');

var DayLabels = require('./DayLabels');
var Week = require('./Week');
var dateutils = require('./dateutils');
var LocalizableMixin = require('./localization').LocalizableMixin;


var Month = React.createClass({
  mixins: [
    LocalizableMixin
  ],

  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    show: React.PropTypes.instanceOf(Date),
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      show: dateutils.startMonth(new Date())
    };
  },

  getWeeks: function (show) {
    show = show || this.props.show;

    var week = dateutils.startWeek(show, this.getLocale());
    var daysAddressed = 7 - dateutils.daysDiff(show, week);
    var daysTotal = dateutils.daysInMonth(show);

    var weeks = [];
    weeks.push(week);
    while (daysAddressed < daysTotal) {
      week = dateutils.addDays(week, 7);
      daysAddressed += 7;
      weeks.push(week);
    }

    return weeks;
  },

  onSelect: function (date) {
    if (this.props.onSelect) {
      this.props.onSelect(date);
    }
  },

  render: function () {
    var weeks = this.getWeeks().map((week) => {
      return (
        <Week
          key={week.getTime()}
          show={week}
          selected={this.props.selected}
          currentMonth={this.props.show.getMonth()}
          onSelect={this.onSelect}
          />
      );
    });

    return (
      <div className="dtpicker-month">
        <DayLabels />
        {weeks}
      </div>
    );
  }
});


module.exports = Month;

