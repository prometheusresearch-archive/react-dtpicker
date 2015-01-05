/** @jsx React.DOM */

'use strict';

var React = require('react');


var Dial = React.createClass({
  propTypes: {
    number: React.PropTypes.number.isRequired,
    zeroFillPositions: React.PropTypes.number,
    onIncrement: React.PropTypes.func,
    onDecrement: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  onIncrement: function () {
    if (this.props.onIncrement) {
      this.props.onIncrement();
    }
  },
  
  onDecrement: function () {
    if (this.props.onDecrement) {
      this.props.onDecrement();
    }
  },

  render: function () {
    var number = this.props.number.toString();
    if (this.props.zeroFillPositions !== undefined) {
      var diff = this.props.zeroFillPositions - number.length;
      while (diff > 0) {
        number = '0' + number;
        diff -= 1;
      }
    }

    return (
      <div className="dtpicker-dial">
        <div
          className="dtpicker-dialAdjust dtpicker-dialIncrement"
          onClick={this.onIncrement}>
          <span className="dtpicker-buttonLabel"></span>
        </div>
        <div
          className="dtpicker-display"
          onClick={this.props.onClick}>
          {number}
        </div>
        <div
         className="dtpicker-dialAdjust dtpicker-dialDecrement"
         onClick={this.onDecrement}>
          <span className="dtpicker-buttonLabel"></span>
        </div>
      </div>
    );
  }
});


module.exports = Dial;

