/** @jsx React.DOM */

'use strict';

var React = require('react');

var dateutils = require('./dateutils');
var LocalizableMixin = require('./localization').LocalizableMixin;


var Day = React.createClass({
  mixins: [
    LocalizableMixin
  ],

  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    show: React.PropTypes.instanceOf(Date),
    current: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      show: new Date(),
      current: true
    };
  },

  onClick: function () {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.show);
    }
  },

  render: function () {
    var classes = "dtpicker-day";
    if (this.props.current) {
      classes += " dtpicker-current";
    }
    if (
        this.props.selected &&
        dateutils.sameDate(this.props.show, this.props.selected)
        ) {
      classes += " dtpicker-selected";
    }

    var label = this.getLocalizer().getUnitDisplay(
      'day',
      this.props.show
    );

    return (
      <div
        className={classes}
        onClick={this.onClick}>
        {label}
      </div>
    );
  }
});


module.exports = Day;

