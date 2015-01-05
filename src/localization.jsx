/** @jsx React.DOM */

'use strict';

var React = require('react');


var LOCALIZER = {};
var LOCALIZER_IMPLEMENTATION = null;


function setLocalizerImplementation(localizer) {
  LOCALIZER = {};
  LOCALIZER_IMPLEMENTATION = localizer;
}


function getLocalizer(locale) {
  locale = locale || 'en';
  if (!LOCALIZER[locale]) {
    LOCALIZER[locale] = new LOCALIZER_IMPLEMENTATION(locale);
  }
  return LOCALIZER[locale];
}



var LocalizationMixin = {
  childContextTypes: {
    locale: React.PropTypes.string
  },

  getChildContext: function () {
    return {
      locale: this.getLocale()
    };
  },

  getLocale: function () {
    return this.props.locale || 'en';
  },

  getLocalizer: function () {
    return getLocalizer(this.getLocale());
  }
};


var LocalizableMixin = {
  contextTypes: {
    locale: React.PropTypes.string
  },

  getLocale: function () {
    return this.context.locale;
  },

  getLocalizer: function () {
    return getLocalizer(this.getLocale());
  }
};


class Localizer {
  constructor(locale) {
    this.locale = locale;
  }

  getFirstDayOfWeek() {
    /*jshint unused:false */
    throw new Error('getFirstDayOfWeek Not Implemented');
  }

  // mode = month | year | decade | century
  getCalendarModeDisplay(mode, date) {
    /*jshint unused:false */
    throw new Error('getCalendarModeDisplay Not Implemented');
  }

  // unit = day | month | year | decade
  getUnitDisplay(unit, date) {
    /*jshint unused:false */
    throw new Error('getUnitDisplay Not Implemented');
  }

  // mode = date | time | datetime
  getPickerDisplay(mode, date) {
    /*jshint unused:false */
    throw new Error('getPickerDisplay Not Implemented');
  }
}


// Uses the Intl class if available, otherwise defaults to en-US.
class DefaultLocalizer extends Localizer {
  /* global Intl */

  constructor(locale, hasIntl) {
    super(locale);

    this.hasIntl = hasIntl !== undefined ? hasIntl : (
      (global.Intl !== undefined) &&
      (global.Intl.DateTimeFormat !== undefined)
    );

    this.NAMES_MONTH_SHORT = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    this.NAMES_DAY_LABELS = [
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S'
    ];
  }

  getFirstDayOfWeek() {
    return 0;  // Sunday
  }

  getDayLabelDisplay(date) {
    if (this.hasIntl) {
      var options = {weekday: 'narrow'};
      return (new Intl.DateTimeFormat(this.locale, options)).format(date);
    } else {
      return this.NAMES_DAY_LABELS[date.getDay()];
    }
  }

  getCalendarModeDisplay(mode, date) {
    if (this.hasIntl) {
      var options = {};

      if (mode === 'month') {
        options.month = 'short';
        options.year = 'numeric';
      } else if (mode === 'year') {
        options.year = 'numeric';
      } else if (mode === 'decade') {
        options.year = 'numeric';
      } else if (mode === 'century') {
        options.year = 'numeric';
      }

      return (new Intl.DateTimeFormat(this.locale, options)).format(date);

    } else {
      if (mode === 'month') {
        return this.getUnitDisplay(this.locale, 'month', date) + ' ' +
          this.getUnitDisplay(this.locale, 'year', date);
      } else if (mode === 'year') {
        return this.getUnitDisplay(this.locale, 'year', date);
      } else if (mode === 'decade') {
        return this.getUnitDisplay(this.locale, 'year', date);
      } else if (mode === 'century') {
        return this.getUnitDisplay(this.locale, 'year', date);
      }
    }
  }

  getUnitDisplay(unit, date) {
    if (this.hasIntl) {
      var options = {};

      if (unit === 'day') {
        options.day = 'numeric';
      } else if (unit === 'month') {
        options.month = 'short';
      } else if (unit === 'year') {
        options.year = 'numeric';
      } else if (unit === 'decade') {
        options.year = 'numeric';
      }

      return (new Intl.DateTimeFormat(this.locale, options)).format(date);

    } else {
      if (unit === 'day') {
        return date.getDate().toString();
      } else if (unit === 'month') {
        return this.NAMES_MONTH_SHORT[date.getMonth()];
      } else if (unit === 'year') {
        return date.getFullYear().toString();
      } else if (unit === 'decade') {
        return date.getFullYear().toString();
      }
    }
  }

  getPickerDisplay(mode, date) {
    if (this.hasIntl) {
      var options = {};

      if (mode === 'date') {
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
        options.weekday = 'long';
      } else if (mode === 'time') {
        options.hour = 'numeric';
        options.minute = '2-digit';
        options.second = '2-digit';
      }  else if (mode === 'datetime') {
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
        options.hour = 'numeric';
        options.minute = '2-digit';
        options.second = '2-digit';
      }

      return (new Intl.DateTimeFormat(this.locale, options)).format(date);
    } else {
      var display = '';

      if ((mode === 'date') || (mode === 'datetime')) {
        display = (date.getMonth() + 1) +
          '/' + date.getDate() +
          '/' + date.getFullYear();
      }
      if ((mode === 'time') || (mode === 'datetime')) {
        if (mode === 'datetime') {
          display += ' ';
        }
        display += date.getHours() +
          ':' + date.getMinutes() +
          ':' + date.getSeconds();
      }

      return display;
    }
  }
}


setLocalizerImplementation(DefaultLocalizer);


module.exports = {
  Localizer: Localizer,
  DefaultLocalizer: DefaultLocalizer,
  
  LocalizationMixin: LocalizationMixin,
  LocalizableMixin: LocalizableMixin,
  
  setLocalizerImplementation: setLocalizerImplementation,
  getLocalizer: getLocalizer
};

