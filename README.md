# rtc-ui-setup

This a user interface wizard that will guide a user through a few tests to
ensure their machine is correctly configured to work with WebRTC.


[![NPM](https://nodei.co/npm/rtc-ui-setup.png)](https://nodei.co/npm/rtc-ui-setup/)

[![experimental](https://img.shields.io/badge/stability-experimental-red.svg)](https://github.com/dominictarr/stability#experimental) 

## Example Usage

```js
var setupWizard = require('rtc-ui-setup');
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

## Icon Licenses

Please note that this module uses the following icons from [The Noun Project](http://thenounproject.com/):

- http://thenounproject.com/term/microphone/28712/

  Microphone designed by Garrett Knoll from the Noun Project

- http://thenounproject.com/term/tuning-fork/21365/

  Tuning Fork designed by Ed Harrison from the Noun Project

Thus, if you use this package in an application or demo please be sure to include the appropriate attribution for the icon work.  Alternatively, you can purchase the right to use the icons without attribution from <thenounproject.com>.


## License(s)

### Apache 2.0

Copyright 2014 National ICT Australia Limited (NICTA)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
