/** @jsx React.DOM */

'use strict';

var React = require('react');

var Dial = require('./Dial');


var ClockDetails = React.createClass({
  propTypes: {
    selected: React.PropTypes.instanceOf(Date).isRequired,
    onChange: React.PropTypes.func.isRequired,
    onStartChoice: React.PropTypes.func,
    twentyFourHour: React.PropTypes.bool,
    showSeconds: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      twentyFourHours: false,
      showSeconds: true
    };
  },

  isAM: function () {
    return (this.props.selected.getHours() < 12);
  },

  toggleAMPM: function () {
    this.onChange('hour', this.isAM() ? 12 : -12);
  },

  onChange: function (unit, increment) {
    this.props.onChange(unit, increment);
  },

  onStartChoice: function (unit) {
    if (this.props.onStartChoice) {
      this.props.onStartChoice(unit);
    }
  },

  render: function () {
    var hours = this.props.selected.getHours();
    if (!this.props.twentyFourHour) {
      hours = (hours % 12) || 12;
    }

    // TODO: Localize AM/PM

    return (
      <div className="dtpicker-clockDetails">
        <Dial
          number={hours}
          zeroFillPositions={2}
          onIncrement={this.onChange.bind(this, 'hour', 1)}
          onDecrement={this.onChange.bind(this, 'hour', -1)}
          onClick={this.onStartChoice.bind(this, 'hour')}
          />
        <div className="dtpicker-clockSeparator">
          <span className="dtpicker-separatorLabel"></span>
        </div>
        <Dial
          number={this.props.selected.getMinutes()}
          zeroFillPositions={2}
          onIncrement={this.onChange.bind(this, 'minute', 1)}
          onDecrement={this.onChange.bind(this, 'minute', -1)}
          onClick={this.onStartChoice.bind(this, 'minute')}
          />
        {this.props.showSeconds &&
          <div className="dtpicker-clockSeparator">
            <span className="dtpicker-separatorLabel"></span>
          </div>
        }
        {this.props.showSeconds &&
          <Dial
            number={this.props.selected.getSeconds()}
            zeroFillPositions={2}
            onIncrement={this.onChange.bind(this, 'second', 1)}
            onDecrement={this.onChange.bind(this, 'second', -1)}
            onClick={this.onStartChoice.bind(this, 'second')}
            />
        }
        {!this.props.twentyFourHour &&
          <div className="dtpicker-ampm">
            <span
              className="dtpicker-toggle" 
              onClick={this.toggleAMPM}>
              {this.isAM() ? 'AM' : 'PM'}
            </span>
          </div>
        }
      </div>
    );
  }
});


module.exports = ClockDetails;

