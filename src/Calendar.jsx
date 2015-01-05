/** @jsx React.DOM */

'use strict';

var React = require('react');

var CalendarControls = require('./CalendarControls');
var CalendarDetails = require('./CalendarDetails');
var dateutils = require('./dateutils');
var LocalizationMixin = require('./localization').LocalizationMixin;


var Calendar = React.createClass({
  mixins: [
    LocalizationMixin
  ],

  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    show: React.PropTypes.instanceOf(Date),
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      show: new Date()
    };
  },

  getInitialState: function () {
    var selected = this.props.selected;
    if (selected) {
      selected = dateutils.cloneDate(selected);
      selected.setHours(0, 0, 0, 0);
    }
    var show = this.props.show || this.props.selected;
    if (show) {
      show = dateutils.cloneDate(show);
      show.setHours(0, 0, 0, 0);
    }

    return {
      selected: selected,
      show: show,
      mode: 'month'
    };
  },

  componentDidMount: function () {
    if (this.props.onSelect && this.state.selected) {
      this.props.onSelect(this.state.selected);
    }
  },

  onSelect: function (newSelect) {
    this.setState({
      selected: newSelect,
      show: newSelect
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.state.selected);
      }
    });
  },

  onModeChange: function (newMode) {
    this.setState({
      mode: newMode
    });
  },

  onShowChange: function (newShow) {
    this.setState({
      show: newShow
    });
  },

  render: function () {
    return (
      <div className="dtpicker-calendar">
        <CalendarControls
          mode={this.state.mode}
          onModeChange={this.onModeChange}
          show={this.state.show}
          onShowChange={this.onShowChange}
          />
        <CalendarDetails
          mode={this.state.mode}
          onModeChange={this.onModeChange}
          show={this.state.show}
          onShowChange={this.onShowChange}
          selected={this.state.selected}
          onSelect={this.onSelect}
          />
      </div>
    );
  }
});


module.exports = Calendar;

