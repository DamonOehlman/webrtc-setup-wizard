var setupWizard = require('..');
var wizard = setupWizard(function(err) {
  if (err) {
    return console.error('wizard aborted with error: ', err);
  }

  console.log('done');
});

document.body.appendChild(wizard);
