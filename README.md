# webrtc-setup-wizard

This a user interface wizard that will guide a user through a few tests to
ensure their machine is correctly configured to work with WebRTC.


[![NPM](https://nodei.co/npm/webrtc-setup-wizard.png)](https://nodei.co/npm/webrtc-setup-wizard/)

[![experimental](https://img.shields.io/badge/stability-experimental-red.svg)](https://github.com/dominictarr/stability#experimental) 

## Example Usage

```js
var setupWizard = require('webrtc-setup-wizard');
var wizard = setupWizard(function(err) {
  if (err) {
    return console.error('wizard aborted with error: ', err);
  }

  console.log('done');
});

document.body.appendChild(wizard);

```

## Test Steps

The following test steps are executed as part of the testing cycle:

- Test audio output (using the Audio API)
- Test capture using local media capture

## Assets

### Icons

Please note that this module uses the following icons from [The Noun Project](http://thenounproject.com/):

- http://thenounproject.com/term/microphone/28712/

  Microphone designed by Garrett Knoll from the Noun Project

- http://thenounproject.com/term/tuning-fork/21365/

  Tuning Fork designed by Ed Harrison from the Noun Project

Thus, if you use this package in an application or demo please be sure to include the appropriate attribution for the icon work.  Alternatively, you can purchase the right to use the icons without attribution from <thenounproject.com>.

### Sound Files

Additionally, the following test sounds are included:

- http://www.freesound.org/people/Erokia/sounds/191370/


## License(s)

### ISC

Copyright (c) 2015, National ICT Australia Limited (NICTA)

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
