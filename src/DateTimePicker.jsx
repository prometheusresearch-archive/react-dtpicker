/** @jsx React.DOM */

'use strict';

var React = require('react');

var Calendar = require('./Calendar');
var Clock = require('./Clock');
var PickerMixin = require('./PickerMixin');
var dateutils = require('./dateutils');


var DateTimePicker = React.createClass({
  mixins: [
    PickerMixin
  ],

  propTypes: {
    show: React.PropTypes.instanceOf(Date)
  },

  getDisplay: function (selected) {
    return selected && this.getLocalizer().getPickerDisplay(
      'datetime',
      selected
    );
  },

  getInitialState: function () {
    return {
      mode: 'calendar'
    };
  },

  onMode: function () {
    this.setState({
      mode: this.state.mode === 'calendar' ? 'clock' : 'calendar'
    });
  },

  onPartialSelect: function (selected) {
    var newSelected = dateutils.cloneDate(selected);
    if (this.state.pendingSelect) {
      if (this.state.mode === 'calendar') {
        newSelected.setHours(
          this.state.pendingSelect.getHours(),
          this.state.pendingSelect.getMinutes(),
          this.state.pendingSelect.getSeconds()
        );

      } else if (this.state.mode === 'clock') {
        newSelected.setFullYear(
          this.state.pendingSelect.getFullYear(),
          this.state.pendingSelect.getMonth(),
          this.state.pendingSelect.getDate()
        );
      }
    }

    this.onSelect(newSelected);
  },

  renderSelector: function () {
    var selector;
    if (this.state.mode === 'calendar') {
      selector = (
        <Calendar
          selected={this.state.pendingSelect}
          onSelect={this.onPartialSelect}
          show={this.props.show}
          />
      );
    } else if (this.state.mode === 'clock') {
      selector = (
        <Clock
          selected={this.state.pendingSelect}
          onSelect={this.onPartialSelect}
          />
      );
    }

    var classes = 'dtpicker-calendarClockMode dtpicker-' +
      this.state.mode +
      'Mode';

    return (
      <div className="dtpicker-calendarClock">
        <div className={classes} onClick={this.onMode}>
          <span className="dtpicker-buttonLabel"></span>
        </div>
        {selector}
      </div>
    );
  },

  render: function () {
    var picker = this.renderPicker();

    return (
      <div className="dtpicker-dateTimePicker">
        {picker}
      </div>
    );
  }
});


module.exports = DateTimePicker;

