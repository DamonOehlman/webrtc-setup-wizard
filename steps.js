var fs = require('fs');
var crel = require('crel');
var svg = require('svg');
var icons = {
  audio: fs.readFileSync(__dirname + '/icons/icon_21365.svg', 'utf8'),
  capture: fs.readFileSync(__dirname + '/icons/icon_28712.svg', 'utf8')
};

function docs(target, label) {
  return crel('a', {
    href: 'http://rtc.io/help/' + target
  }, (label || 'this documentation'));
}

exports.welcome = [
  crel('h1', 'Playback and Media Capture Test'),
  crel('p', [
    'We are know about to test the audio playback and media capture',
    'capabilities of your computer.',
  ].join(' ')),
    crel('p', [
    'We will walk through a number of tests to check whether your',
    'computer can be used for audio / video conferencing. If the test is',
    'successful, please continue to the next text using the "next"',
    'button'
  ].join(' '))
];

exports.audio = [
  crel('h1', 'Can you here the test sound?'),
  svg(icons.audio),
  crel('p', 'If you can here the sound, click "next"'),
  crel('p', 'Otherwise, please consult ', docs('audiosetup'))
];

exports.capture = [
  crel('h1', 'Test Audio Capture'),
  crel('p', 'We will now test whether we can capture a media stream')
];
