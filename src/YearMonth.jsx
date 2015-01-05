/** @jsx React.DOM */

'use strict';

var React = require('react');

var dateutils = require('./dateutils');
var LocalizableMixin = require('./localization').LocalizableMixin;


var YearMonth = React.createClass({
  mixins: [
    LocalizableMixin
  ],

  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    show: React.PropTypes.instanceOf(Date),
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      show: dateutils.startMonth(new Date())
    };
  },

  onClick: function () {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.show);
    }
  },

  render: function () {
    var classes = "dtpicker-month";
    if (
        this.props.selected &&
        dateutils.sameMonth(this.props.show, this.props.selected)
        ) {
      classes += " dtpicker-selected";
    }

    var label = this.getLocalizer().getUnitDisplay(
      'month',
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


module.exports = YearMonth;

