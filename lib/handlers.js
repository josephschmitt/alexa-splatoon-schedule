'use strict';

var _ = require('underscore');
var xhr = require('request-promise');
var moment = require('moment-timezone');
require('./titleCase.js');

var SPLATOON_SCHEDULE_URL = 'https://splatoon.ink/schedule.json';

function loadSchedule() {
  return xhr({
    uri: SPLATOON_SCHEDULE_URL,
    json: true
  }).then(function (response) {
    return response.schedule;
  });
}

/**
 * Handles looking up the current maps schedule. If a MapType slot type is sent, then it only
 * responds with the schedule for that type.
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 * @returns {Boolean}
 */
function handleMapsSchedule(request, response) {
  loadSchedule()
    .then(function (schedule) {
      var latest = _.first(schedule);
      var type = request.slot('MapType');
      var speechResponse;

      if (type) {
        speechResponse = getScheduleSpeechOutput(latest, type.toLowerCase());
        response
          .say(speechResponse)
          .card('Splatoon ' + type.toTitleCase() + ' Map Schedule', speechResponse);
      } else {
        speechResponse = [
          getScheduleSpeechOutput(latest, 'regular'),
          getScheduleSpeechOutput(latest, 'ranked')
        ].join(' ');
        response
          .say(speechResponse)
          .card('Splatoon Map Schedule', speechResponse);
      }

      response.send();
    });

  // Async response
  return false;
}

/**
 * Returns the speech output for the given schedule data and map type.
 * @param {Object} data
 * @param {String} type
 * @returns {String}
 */
function getScheduleSpeechOutput(data, type) {
  var rules = data[type].rules.en;
  var maps = _.pluck(data[type].maps, 'nameEN').join(' and ');

  return 'The current ' + type + ' ' + rules + ' maps are: ' + maps + '.';
}

/**
 * Handles looking up when the next map rotation will occur.
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 * @returns {Boolean}
 */
function handleMapsRotation(request, response) {
  loadSchedule()
    .then(function (schedule) {
      var latest = _.first(schedule);
      var speechResponse = 'The next map rotation is ' + moment().to(moment(latest.endTime));
      response
        .say(speechResponse)
        .card('Next Splatoon Map Rotation', speechResponse)
        .send();
    });

  // Async response
  return false;
}

/**
 * Handles looking up if it's currently Splatfest.
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 * @returns {Boolean}
 */
function handleSplatfest(request, response) {
  xhr({
    uri: SPLATOON_SCHEDULE_URL,
    json: true
  }).then(function (data) {
    var speechResponse = data.splatfest ? 'Yes, it\'s Splatfest!' : 'No, not right now.';
    response
      .say(speechResponse)
      .card('Is it Splatfest?', speechResponse)
      .send();
  });

  // Async response
  return false;
}

/**
 * Handles requests for help with the skill.
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
function handleHelpIntent(request, response) {
  // Async response
  return false;
}

module.exports = {
  handleMapsSchedule: handleMapsSchedule,
  handleMapsRotation: handleMapsRotation,
  handleSplatfest: handleSplatfest,
  handleHelpIntent: handleHelpIntent
};
