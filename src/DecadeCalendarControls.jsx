/** @jsx React.DOM */

'use strict';

var React = require('react');

var CalendarControlsMixin = require('./CalendarControlsMixin');
var dateutils = require('./dateutils');


var DecadeCalendarControls = React.createClass({
  displayName: 'DecadeCalendarControls',

  mixins: [
    CalendarControlsMixin
  ],

  getPreviousShowDate: function (date) {
    date = dateutils.startDecade(date);
    return dateutils.addYears(date, -10);
  },

  getNextShowDate: function (date) {
    date = dateutils.startDecade(date);
    return dateutils.addYears(date, 10);
  },

  getLabel: function (date) {
    return this.getLocalizer().getCalendarModeDisplay(
      'decade',
      dateutils.startDecade(date)
    );
  }
});


module.exports = DecadeCalendarControls;

