/** @jsx React.DOM */

'use strict';

var React = require('react');

var dateutils = require('./dateutils');
var LocalizableMixin = require('./localization').LocalizableMixin;


var DecadeYear = React.createClass({
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
      show: dateutils.startYear(new Date())
    };
  },

  onClick: function () {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.show);
    }
  },

  render: function () {
    var classes = "dtpicker-year";
    if (
        this.props.selected &&
        (this.props.show.getFullYear() === this.props.selected.getFullYear())
        ) {
      classes += " dtpicker-selected";
    }

    var label = this.getLocalizer().getUnitDisplay(
      'year',
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


module.exports = DecadeYear;

