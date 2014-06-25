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

var defaultcss = require('defaultcss');
var crel = require('crel');
var fs = require('fs');
var DEFAULT_STEPS = [
  'welcome',
  'audio',
  'capture',
  'connect'
];

var stepHTML = require('./steps');

function createButtons() {
  return crel(
    'div',
    { class: 'rtc-wizard-buttons' },
    crel('button', { 'data-action': 'cancel' }, 'cancel'),
    crel('button', { 'data-action': 'next' }, 'next')
  );
}

function createStep(stepCount) {
  return function createStep(name, index) {
    return crel('section', {
      class: 'rtc-wizard-step',
      'data-step': name
    }, stepHTML[name]);
  };
}

function makeFinishButton(wizard){
  var button = wizard.querySelector('button[data-action="next"]');

  if (button) {
    button.dataset.action = 'finish';
    button.innerText = 'finish';
  }
}

module.exports = function(opts, callback) {
  var currentStep = 0;
  var steps = (opts || {}).steps || DEFAULT_STEPS;
  var container = crel('div', {
    class: 'rtc-wizard-pages'
  });
  var wizard = crel('div', {
    class: 'rtc-wizard rtc-setup',
  }, container, createButtons());
  var wizardSteps = steps.map(createStep(steps.length));
  var handlers = {
    cancel: function() {
      handlers.finish(new Error('Cancelled'));
    },

    next: function() {
      currentStep = activateStep(currentStep + 1);
      if (currentStep >= wizardSteps.length - 1) {
        makeFinishButton(wizard);
      }
    },

    finish: function(err) {
      // remove the container
      if (wizard.parentNode) {
        wizard.parentNode.removeChild(wizard);
      }

      if (typeof callback == 'function') {
        callback(err);
      }
    }
  };

  function activateStep(target) {
    wizardSteps.forEach(function(step, idx) {
      step.dataset.state = (idx <= target && (idx < target ? 'past' : 'active')) || '';
    });

    return target;
  }

  function handleClick(evt) {
    var handler = evt.target && handlers[evt.target.dataset.action];
    if (typeof handler == 'function') {
      handler();
    }
  }

  // remap args if required
  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }

  // insert the defaultcss we are using
  defaultcss('rtc-ui-setup', fs.readFileSync(__dirname + '/css/wizard.css'));

  // add the steps to the container
  wizardSteps.forEach(function(el) {
    container.appendChild(el);
  });

  wizard.addEventListener('click', handleClick);
  currentStep = activateStep(0);

  return wizard;
};
