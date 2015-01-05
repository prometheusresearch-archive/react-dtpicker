/** @jsx React.DOM */

'use strict';

var React = require('react');

var LocalizableMixin = require('./localization').LocalizableMixin;


var CalendarControlsMixin = {
  mixins: [
    LocalizableMixin
  ],

  propTypes: {
    show: React.PropTypes.instanceOf(Date),
    onModeChange: React.PropTypes.func,
    onShowChange: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      show: new Date()
    };
  },

  onPrevious: function () {
    if (this.props.onShowChange) {
      this.props.onShowChange(this.getPreviousShowDate(this.props.show));
    }
  },

  onNext: function () {
    if (this.props.onShowChange) {
      this.props.onShowChange(this.getNextShowDate(this.props.show));
    }
  },

  onModeChange: function () {
    if (this.props.onModeChange) {
      this.props.onModeChange();
    }
  },

  render: function () {
    return (
      <div className="dtpicker-calendarControls">
        <div
          className="dtpicker-calendarNav dtpicker-calendarPrevious"
          onClick={this.onPrevious}>
          <span className="dtpicker-buttonLabel"></span>
        </div>
        <div
          className="dtpicker-calendarLabel"
          onClick={this.onModeChange}>
          {this.getLabel(this.props.show)}
        </div>
        <div
          className="dtpicker-calendarNav dtpicker-calendarNext"
          onClick={this.onNext}>
          <span className="dtpicker-buttonLabel"></span>
        </div>
      </div>
    );
  }
};


module.exports = CalendarControlsMixin;

