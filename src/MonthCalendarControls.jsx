/** @jsx React.DOM */

'use strict';

var React = require('react');

var CalendarControlsMixin = require('./CalendarControlsMixin');
var dateutils = require('./dateutils');


var MonthCalendarControls = React.createClass({
  displayName: 'MonthCalendarControls',

  mixins: [
    CalendarControlsMixin
  ],

  getPreviousShowDate: function (date) {
    date = dateutils.cloneDate(date);
    date.setDate(1);
    return dateutils.addMonths(date, -1);
  },

  getNextShowDate: function (date) {
    date = dateutils.cloneDate(date);
    date.setDate(1);
    return dateutils.addMonths(date, 1);
  },

  getLabel: function (date) {
    return this.getLocalizer().getCalendarModeDisplay(
      'month',
      date
    );
  }
});


module.exports = MonthCalendarControls;

