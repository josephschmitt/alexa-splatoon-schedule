'use strict';

var handlers = require('./handlers.js');
var alexa = require('alexa-app');

var SplatoonSchedule = new alexa.app('splatoonSchedule');

SplatoonSchedule.launch(handlers.handleMapsSchedule);
SplatoonSchedule.intent('SplatoonMaps', handlers.handleMapsSchedule);
SplatoonSchedule.intent('SplatoonMapsByType', handlers.handleMapsSchedule);
SplatoonSchedule.intent('SplatoonMapRotation', handlers.handleMapsRotation);
SplatoonSchedule.intent('Splatfest', handlers.handleSplatfest);
SplatoonSchedule.intent('AMAZON.HelpIntent', handlers.handleHelpIntent);

module.exports = SplatoonSchedule;
