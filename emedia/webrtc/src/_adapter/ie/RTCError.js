var _util = require('../../components/Util');
var _logger = _util.tagLogger("IE");

// enum RTCErrorDetailType {
//     "data-channel-failure",
//         "dtls-failure",
//         "fingerprint-failure",
//         "idp-bad-script-failure",
//         "idp-execution-failure",
//         "idp-load-failure",
//         "idp-need-login",
//         "idp-timeout",
//         "idp-tls-failure",
//         "idp-token-expired",
//         "idp-token-invalid",
//         "sctp-failure",
//         "sdp-syntax-error",
//         "hardware-encoder-not-available",
//         "hardware-encoder-error"
// };
var RTCError = _util.prototypeExtend({
    //type
    //name
    //message
    //errorDetail
    //sdpLineNumber
    //httpRequestStatusCode
    //sctpCauseCode
    //receivedAlert
    //toString()
});

module.exports = RTCError;