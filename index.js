/**
  # rtc-ui-setup

  This a user interface wizard that will guide a user through a few tests to
  ensure their machine is correctly configured to work with WebRTC.

  ## Example Usage

  <<< examples/simple.js

  ## Test Steps

  The following test steps are executed as part of the testing cycle:

  - Test audio output (using the Audio API)
  - Test capture using local media capture

  ## Icon Licenses

  <<< docs/icons.md

**/

var crel = require('crel');
var svg = require('svg');
var fs = require('fs');
var DEFAULT_STEPS = [
  'welcome',
  'audio',
  'capture',
  'connect'
];

var icons = {
  audio: fs.readFileSync(__dirname + '/icons/icon_21365.svg', 'utf8'),
  capture: fs.readFileSync(__dirname + '/icons/icon_28712.svg', 'utf8')
};

function createStep(name) {
  return crel('section', {
    class: 'rtc-wizard-step',
    'data-step': name
  }, svg(icons[name]));
}

module.exports = function(opts) {
  var steps = (opts || {}).steps || DEFAULT_STEPS;
  var container = crel('div', {
    class: 'rtc-wizard rtc-setup'
  });

  // create the child elements
  var wizardSteps = steps.map(createStep);

  // add the steps to the container
  wizardSteps.forEach(function(el) {
    container.appendChild(el);
  });

  return container;
};
