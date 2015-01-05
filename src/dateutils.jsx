'use strict';

var getLocalizer = require('./localization').getLocalizer;


function cloneDate(date) {
  return new Date(date.getTime());
}


function addDays(date, numDays) {
  date = cloneDate(date);
  date.setDate(date.getDate() + numDays);
  return date;
}

function addMonths(date, numMonths) {
  date = cloneDate(date);

  var direction = numMonths > 0 ? 1 : -1;
  numMonths = Math.abs(numMonths);

  for (var i = 0; i < numMonths; i++) {
    date.setMonth(date.getMonth() + direction);
  }

  return date;
}

function addYears(date, numYears) {
  date = cloneDate(date);
  date.setFullYear(date.getFullYear() + numYears);
  return date;
}


function startWeek(date, locale) {
  var localizer = getLocalizer(locale);
  var firstDay = localizer.getFirstDayOfWeek();
  date = cloneDate(date);
  date.setDate(date.getDate() - (date.getDay() - firstDay));
  return date;
}

function startMonth(date) {
  date = cloneDate(date);
  date.setDate(1);
  return date;
}

function startYear(date) {
  date = cloneDate(date);
  date.setMonth(0, 1);
  return date;
}

function startDecade(date) {
  date = cloneDate(date);
  date.setMonth(0, 1);
  date.setYear(date.getFullYear() - (date.getFullYear() % 10));
  return date;
}

function startCentury(date) {
  date = cloneDate(date);
  date.setMonth(0, 1);
  date.setYear(date.getFullYear() - (date.getFullYear() % 100));
  return date;
}


function sameDate(first, second) {
  return (first.getFullYear() === second.getFullYear()) &&
    (first.getMonth() === second.getMonth()) &&
    (first.getDate() === second.getDate());
}

function sameMonth(first, second) {
  return (first.getFullYear() === second.getFullYear()) &&
    (first.getMonth() === second.getMonth());
}


function daysDiff(first, second) {
  var timeDiff = first.getTime() - second.getTime();
  return Math.floor(timeDiff / (1000 * 3600 * 24));
}

function daysInMonth(date) {
  date = new Date(date.getFullYear(), (date.getMonth() + 1), 0);
  return date.getDate();
}


module.exports = {
  cloneDate: cloneDate,

  addDays: addDays,
  addMonths: addMonths,
  addYears: addYears,

  startWeek: startWeek,
  startMonth: startMonth,
  startYear: startYear,
  startDecade: startDecade,
  startCentury: startCentury,

  sameDate: sameDate,
  sameMonth: sameMonth,

  daysDiff: daysDiff,
  daysInMonth: daysInMonth
};

