/** @jsx React.DOM */

'use strict';

var React = require('react');

var dateutils = require('./dateutils');
var LocalizableMixin = require('./localization').LocalizableMixin;


var DayLabels = React.createClass({
  mixins: [
    LocalizableMixin
  ],

  getInitialState: function () {
    return {
      labels: []
    };
  },

  componentWillMount: function () {
    var start = dateutils.startWeek(new Date(), this.getLocale());
    var labels = [];

    for (var i = 0; i < 7; i++) {
      labels.push(this.getLocalizer().getDayLabelDisplay(
        dateutils.addDays(start, i)
      ));
    }

    this.setState({
      labels: labels
    });
  },

  render: function () {
    var days = this.state.labels.map(function (day, idx) {
      return (
        <div
          className="dtpicker-dayLabel"
          key={idx}>
          {day}
        </div>
      );
    });

    return (
      <div className="dtpicker-dayLabels">
        {days}
      </div>
    );
  }
});


module.exports = DayLabels;

