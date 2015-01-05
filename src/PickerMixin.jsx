/** @jsx React.DOM */

'use strict';

var React = require('react');

var LocalizationMixin = require('./localization').LocalizationMixin;


var PickerMixin = {
  mixins: [
    LocalizationMixin
  ],

  propTypes: {
    selected: React.PropTypes.instanceOf(Date),
    onSelect: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      selected: this.props.selected,
      pendingSelect: this.props.selected || new Date(),
      selectorShowing: false
    };
  },

  onSelect: function (selected) {
    this.setState({
      pendingSelect: selected
    });
  },

  doSelect: function () {
    this.setState({
      selected: this.state.pendingSelect,
      selectorShowing: false
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.state.selected);
      }
    });
  },

  doClear: function () {
    this.setState({
      selected: null,
      selectorShowing: false
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.state.selected);
      }
    });
  },

  clickDisplay: function () {
    this.setState({
      selectorShowing: !this.state.selectorShowing
    });
  },

  renderPicker: function () {
    var display = this.state.selected;
    if (this.getDisplay) {
      display = this.getDisplay(display);
    }

    var selectorClasses = 'dtpicker-pickerSelector';
    if (this.state.selectorShowing) {
      selectorClasses += ' dtpicker-active';
    }

    var selector = this.renderSelector();

    return (
      <div className="dtpicker-picker">
        <div
          className="dtpicker-pickerDisplay"
          onClick={this.clickDisplay}>
          {display}
        </div>
        <div className={selectorClasses}>
          {selector}
          <div 
            className="dtpicker-pickerConfirm"
            onClick={this.doSelect}>
            <span className="dtpicker-buttonLabel"></span>
          </div>
          <div
            className="dtpicker-pickerClear"
            onClick={this.doClear}>
            <span className="dtpicker-buttonLabel"></span>
          </div>
        </div>
      </div>
    );
  }
};


module.exports = PickerMixin;

