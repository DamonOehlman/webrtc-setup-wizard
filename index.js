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

var stepText = {
  welcome: 'Welcome to the configuration wizard'
};

function createButtons(index, count) {
  var buttons = [];

  buttons.push(crel('button', {
    class: 'cancel'
  }, 'cancel'));

  if (index < (count-1)) {
    buttons.push(crel('button', {
      class: 'stepforward'
    }, 'next'));
  }
  else {
    buttons.push(crel('button', {
      class: 'wizardfinish'
    }, 'finish'));
  }

  return crel('div', { class: 'rtc-wizard-buttons' }, buttons);
}

function createIcon(name) {
  return crel('div', {
    class: 'rtc-wizard-icon',
  }, svg(icons[name]));
}

function createStepText(name) {
  return crel('div', {
    class: 'rtc-wizard-text'
  }, stepText[name] || '');
}

function createStep(stepCount) {
  return function createStep(name, index) {
    return crel('section', {
      class: 'rtc-wizard-step',
      'data-step': name
    }, createIcon(name), createStepText(name), createButtons(index, stepCount));
  };
}

module.exports = function(opts, callback) {
  var currentStep = 0;
  var steps = (opts || {}).steps || DEFAULT_STEPS;
  var container = crel('div', {
    class: 'rtc-wizard rtc-setup'
  });
  var wizardSteps = steps.map(createStep(steps.length));
  var handlers = {
    cancel: function() {
      handlers.wizardfinish(new Error('Cancelled'));
    },

    stepforward: function() {
      currentStep = activateStep(currentStep + 1);
    },

    stepback: function() {
      currentStep = activateStep(currentStep - 1);
    },

    wizardfinish: function(err) {
      // remove the container
      if (container.parentNode) {
        container.parentNode.removeChild(container);
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
    var handler = evt.target && handlers[evt.target.className];
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
    el.addEventListener('click', handleClick);
    container.appendChild(el);
  });

  currentStep = activateStep(0);

  return container;
};
