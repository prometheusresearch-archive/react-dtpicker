/** @jsx React.DOM */

'use strict';

var React = require('react');

var Calendar = require('./Calendar');
var PickerMixin = require('./PickerMixin');


var DatePicker = React.createClass({
  mixins: [
    PickerMixin
  ],

  propTypes: {
    show: React.PropTypes.instanceOf(Date)
  },

  getDisplay: function (selected) {
    return selected && this.getLocalizer().getPickerDisplay(
      'date',
      selected
    );
  },

  renderSelector: function () {
    return (
      <Calendar
        onSelect={this.onSelect}
        selected={this.state.pendingSelect}
        show={this.props.show}
        />
    );
  },

  render: function () {
    var picker = this.renderPicker();

    return (
      <div className="dtpicker-datePicker">
        {picker}
      </div>
    );
  }
});


module.exports = DatePicker;

