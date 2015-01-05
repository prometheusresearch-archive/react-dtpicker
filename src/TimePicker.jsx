/** @jsx React.DOM */

'use strict';

var React = require('react');

var Clock = require('./Clock');
var PickerMixin = require('./PickerMixin');


var TimePicker = React.createClass({
  mixins: [
    PickerMixin
  ],

  propTypes: {
    showSeconds: React.PropTypes.bool,
    twentyFourHour: React.PropTypes.bool
  },

  getDisplay: function (selected) {
    return selected && this.getLocalizer().getPickerDisplay(
      'time',
      selected
    );
  },

  renderSelector: function () {
    return (
      <Clock
        onSelect={this.onSelect}
        selected={this.state.pendingSelect}
        showSeconds={this.props.showSeconds}
        twentyFourHour={this.props.twentyFourHour}
        />
    );
  },

  render: function () {
    var picker = this.renderPicker();

    return (
      <div className="dtpicker-timePicker">
        {picker}
      </div>
    );
  }
});


module.exports = TimePicker;

