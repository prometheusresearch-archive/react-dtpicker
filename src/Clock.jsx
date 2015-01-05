/** @jsx React.DOM */

'use strict';

var React = require('react');

var ClockDetails = require('./ClockDetails');
var ClockChoice = require('./ClockChoice');
var dateutils = require('./dateutils');
var LocalizationMixin = require('./localization').LocalizationMixin;


function range(start, stop, step) {
  var result = [];
  for (var i = start; i <= stop; i += step) {
    result.push(i);
  }
  return result;
}


var CHOICES_12 = range(1, 12, 1);
var CHOICES_24 = range(0, 23, 1);
var CHOICES_60 = range(0, 55, 5);


var Clock = React.createClass({
  mixins: [
    LocalizationMixin
  ],

  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    onSelect: React.PropTypes.func,
    showSeconds: React.PropTypes.bool,
    twentyFourHour: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      selected: new Date(),
      showSeconds: true,
      twentyFourHour: false
    };
  },

  getInitialState: function () {
    return {
      selected: this.props.selected,
      mode: 'clock'
    };
  },

  onChange: function (unit, increment) {
    var newSelected = dateutils.cloneDate(this.state.selected);

    if (unit === 'hour') {
      newSelected.setHours(newSelected.getHours() + increment);
    } else if (unit === 'minute') {
      newSelected.setMinutes(newSelected.getMinutes() + increment);
    } else if (unit === 'second') {
      newSelected.setSeconds(newSelected.getSeconds() + increment);
    }
    if (!this.props.showSeconds && newSelected.getSeconds() !== 0) {
      newSelected.setSeconds(0);
    }

    this.setState({
      selected: newSelected
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.state.selected);
      }
    });
  },

  onStartChoice: function (unit) {
    this.setState({
      mode: 'choice',
      choiceUnit: unit
    });
  },

  onChoice: function (choice) {
    var newSelected = dateutils.cloneDate(this.state.selected);

    if (this.state.choiceUnit === 'hour') {
      newSelected.setHours(choice);
    } else if (this.state.choiceUnit === 'minute') {
      newSelected.setMinutes(choice);
    } else if (this.state.choiceUnit === 'second') {
      newSelected.setSeconds(choice);
    }
    if (!this.props.showSeconds && newSelected.getSeconds() !== 0) {
      newSelected.setSeconds(0);
    }

    this.setState({
      selected: newSelected,
      mode: 'clock'
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.state.selected);
      }
    });
  },

  render: function () {
    var modeHandler;
    if (this.state.mode === 'clock') {
      modeHandler = (
        <ClockDetails
          selected={this.state.selected}
          onChange={this.onChange}
          onStartChoice={this.onStartChoice}
          twentyFourHour={this.props.twentyFourHour}
          showSeconds={this.props.showSeconds}
          /> 
      );
    } else if (this.state.mode === 'choice') {
      var choices;
      if (this.state.choiceUnit === 'hour') {
        if (this.props.twentyFourHour) {
          choices = CHOICES_24;
        } else {
          choices = CHOICES_12;
        }
      } else {
        choices = CHOICES_60;
      }
      modeHandler = (
        <ClockChoice
          choices={choices}
          onChoice={this.onChoice}
          />
      );
    }

    return (
      <div className="dtpicker-clock">
        {modeHandler}
      </div>
    );
  }
});


module.exports = Clock;

