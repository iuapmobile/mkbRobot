cordova.define("cordova-plugin-ifly-speech.Speech", function(require, exports, module) {
var exec = require('cordova/exec');
var speech = {};
speech.open = function(parame, successCallback, errorCallback) {
	exec(successCallback, errorCallback, "Speech", "openSpeechDialog", [parame]);
}
module.exports = speech;
});
