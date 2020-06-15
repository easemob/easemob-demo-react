$(function () {
    //发起视频
    $('#rtCall').click(function () {
        WebIM.call.caller = $('#name').val();
        //第三个参数为是否录制、第四个参数为是否合并，第五个参数是否支持小程序
        WebIM.call.makeVideoCall(toID, null, true, true);
    })
    //发起音频
    $('#rtAudioCall').click(function () {
        WebIM.call.caller = $('#name').val();
        WebIM.call.makeVoiceCall(toID, null, true, true);
    })
    //挂断视频
    $('#rtEndCall').click(function () {
        WebIM.call.endCall();
    })
})