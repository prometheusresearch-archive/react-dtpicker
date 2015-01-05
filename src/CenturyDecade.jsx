/** @jsx React.DOM */

'use strict';

var React = require('react');

var dateutils = require('./dateutils');
var LocalizableMixin = require('./localization').LocalizableMixin;


var CenturyDecade = React.createClass({
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
      show: dateutils.startDecade(new Date())
    };
  },

  onClick: function () {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.show);
    }
  },

  render: function () {
    var classes = "dtpicker-decade";
    var decade = dateutils.startDecade(this.props.show);
    if (
        this.props.selected &&
        (this.props.selected >= decade) &&
        (this.props.selected < dateutils.addYears(decade, 10))
        ) {
      classes += " dtpicker-selected";
    }

    var label = this.getLocalizer().getUnitDisplay(
      'decade',
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


module.exports = CenturyDecade;

