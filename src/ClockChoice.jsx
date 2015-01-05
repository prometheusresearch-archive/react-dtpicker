/** @jsx React.DOM */

'use strict';

var React = require('react');


var ClockChoice = React.createClass({
  propTypes: {
    choices: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    onChoice: React.PropTypes.func.isRequired
  },

  onChoice: function (choice) {
    this.props.onChoice(choice);
  },

  render: function () {
    var choices = this.props.choices.map((choice) => {
      return (
        <div
          key={choice}
          onClick={this.onChoice.bind(this, choice)}
          className="dtpicker-choice">
          {choice}
        </div>
      );
    });

    return (
      <div className="dtpicker-clockChoice">
        {choices}
      </div>
    );
  }
});


module.exports = ClockChoice;

