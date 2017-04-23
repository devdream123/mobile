# Installation
I suppose Node and NPM are installed
run (if U didn't alredy)
```
npm install -g ionic cordova
```
for more installation reference see [Ionic docs](http://ionicframework.com/docs/intro/installation/)

clone repository and run
```
npm install
```
plug device (with developer settings turned on) and run (e.g. for android):
```
ionic platform add android
```
then
```
ionic run android --device
```
`--device` means that emulator will be skipped and app will be deployed to device

for actual development better use:
```
ionic serve
```
but this won't work for perfectly for now since FCM requires cordova plugin. (Mocks for browsers will be added if needed)
