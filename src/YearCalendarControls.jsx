/** @jsx React.DOM */

'use strict';

var React = require('react');

var CalendarControlsMixin = require('./CalendarControlsMixin');
var dateutils = require('./dateutils');


var YearCalendarControls = React.createClass({
  displayName: 'YearCalendarControls',

  mixins: [
    CalendarControlsMixin
  ],

  getPreviousShowDate: function (date) {
    date = dateutils.startYear(date);
    return dateutils.addYears(date, -1);
  },

  getNextShowDate: function (date) {
    date = dateutils.startYear(date);
    return dateutils.addYears(date, 1);
  },

  getLabel: function (date) {
    return this.getLocalizer().getCalendarModeDisplay(
      'year',
      date
    );
  }
});


module.exports = YearCalendarControls;

