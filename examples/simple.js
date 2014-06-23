var setupWizard = require('..');
var wizard = setupWizard(function() {
  console.log('done');
});

document.body.appendChild(wizard);
