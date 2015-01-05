/** @jsx React.DOM */

'use strict';

var React = require('react');

var CalendarControlsMixin = require('./CalendarControlsMixin');
var dateutils = require('./dateutils');


var CenturyCalendarControls = React.createClass({
  displayName: 'CenturyCalendarControls',

  mixins: [
    CalendarControlsMixin
  ],

  getPreviousShowDate: function (date) {
    date = dateutils.startCentury(date);
    return dateutils.addYears(date, -100);
  },

  getNextShowDate: function (date) {
    date = dateutils.startCentury(date);
    return dateutils.addYears(date, 100);
  },

  getLabel: function (date) {
    return this.getLocalizer().getCalendarModeDisplay(
      'century',
      dateutils.startCentury(date)
    );
  }
});


module.exports = CenturyCalendarControls;


