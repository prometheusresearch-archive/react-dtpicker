/** @jsx React.DOM */

'use strict';

var React = require('react');

var Day = require('./Day');
var dateutils = require('./dateutils');
var LocalizableMixin = require('./localization').LocalizableMixin;


var Week = React.createClass({
  mixins: [
    LocalizableMixin
  ],

  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    show: React.PropTypes.instanceOf(Date),
    currentMonth: React.PropTypes.number,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      //show: dateutils.startWeek(new Date(), this.getLocale())
    };
  },

  getDays: function (show) {
    show = dateutils.cloneDate(show || this.props.show);

    var days = [];
    for (var i = 0; i < 7; i++) {
      days.push(show);
      show = dateutils.addDays(show, 1);
    }

    return days;
  },

  isCurrent: function (day) {
    if (this.props.currentMonth !== null) {
      return day.getMonth() === this.props.currentMonth;
    }
    return true;
  },

  onSelect: function (date) {
    if (this.props.onSelect) {
      this.props.onSelect(date);
    }
  },

  render: function () {
    var days = this.getDays().map((day) => {
      return (
        <Day
          key={day.getTime()}
          show={day}
          current={this.isCurrent(day)}
          selected={this.props.selected}
          onSelect={this.onSelect}
          />
      );
    });

    return (
      <div className="dtpicker-week">
        {days}
      </div>
    );
  }
});


module.exports = Week;

