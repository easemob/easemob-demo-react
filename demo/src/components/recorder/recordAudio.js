
import { message } from 'antd'
window.URL = window.URL || window.webkitURL
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

const HZRecorder = function(stream, config){
    config = config || {}
    config.sampleBits = config.sampleBits || 16 // 采样数位 8, 16
    config.sampleRate = config.sampleRate || (16000) // 采样率(1/6 44100)

    var context = new AudioContext()
    var audioInput = context.createMediaStreamSource(stream)
    var recorder = context.createScriptProcessor(16 * 1024, 1, 1)
    var emptyCheckCount = 0
    var emptyDatacount = 0

    const interpolateArray = (data, newSampleRate, oldSampleRate) => {
        var fitCount = Math.round(data.length * (newSampleRate / oldSampleRate))
        var newData = new Array()
        var springFactor = new Number((data.length - 1) / (fitCount - 1))
        newData[0] = data[0] // for new allocation
        for(var i = 1; i < fitCount - 1; i++){
            var tmp = i * springFactor
            var before = new Number(Math.floor(tmp)).toFixed()
            var after = new Number(Math.ceil(tmp)).toFixed()
            var atPoint = tmp - before
            newData[i] = linearInterpolate(data[before], data[after], atPoint)
        }
        newData[fitCount - 1] = data[data.length - 1] // for new allocation
        return newData
    }
    const linearInterpolate = (before, after, atPoint) => {
        return before + (after - before) * atPoint
    }

    var audioData = {
        size: 0, // 录音文件长度
        buffer: [], // 录音缓存
        inputSampleRate: context.sampleRate, // 输入采样率
        inputSampleBits: 16, // 输入采样数位 8, 16
        outputSampleRate: config.sampleRate, // 输出采样率
        outputSampleBits: config.sampleBits, // 输出采样数位 8, 16
        input: function(data){
            this.buffer.push(new Float32Array(data))
            this.size += data.length
        },
        compress: function(){
            // change sampleRate
            var data = new Float32Array(this.size)
            var offset = 0
            for(var i = 0; i < this.buffer.length; i++){
                data.set(this.buffer[i], offset)
                offset += this.buffer[i].length
            }

            var result = interpolateArray(data, this.outputSampleRate, this.inputSampleRate)

            return result
        },
        encodeWAV: function(){
            var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate)
            var sampleBits = Math.min(this.inputSampleBits, this.outputSampleBits)
            var bytes = this.compress()
            var dataLength = bytes.length * (sampleBits / 8)
            var buffer = new ArrayBuffer(44 + dataLength)
            var data = new DataView(buffer)

            var channelCount = 1// 单声道
            var offset = 0

            var writeString = function(str){
                for(var i = 0; i < str.length; i++){
                    data.setUint8(offset + i, str.charCodeAt(i))
                }
            }

            // 资源交换文件标识符
            writeString('RIFF')
            offset += 4
            // 下个地址开始到文件尾总字节数,即文件大小-8
            data.setUint32(offset, 36 + dataLength, true)
            offset += 4
            // WAV文件标志
            writeString('WAVE')
            offset += 4
            // 波形格式标志
            writeString('fmt ')
            offset += 4
            // 过滤字节,一般为 0x10 = 16
            data.setUint32(offset, 16, true)
            offset += 4
            // 格式类别 (PCM形式采样数据)
            data.setUint16(offset, 1, true)
            offset += 2
            // 通道数
            data.setUint16(offset, channelCount, true)
            offset += 2
            // 采样率,每秒样本数,表示每个通道的播放速度
            data.setUint32(offset, sampleRate, true)
            offset += 4
            // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
            data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true)
            offset += 4
            // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
            data.setUint16(offset, channelCount * (sampleBits / 8), true)
            offset += 2
            // 每样本数据位数
            data.setUint16(offset, sampleBits, true)
            offset += 2
            // 数据标识符
            writeString('data')
            offset += 4
            // 采样数据总数,即数据总大小-44
            data.setUint32(offset, dataLength, true)
            offset += 4
            // 写入采样数据
            if(sampleBits === 8){
                for(var i = 0; i < bytes.length; i++, offset++){
                    var s = Math.max(-1, Math.min(1, bytes[i]))
                    var val = s < 0 ? s * 0x8000 : s * 0x7FFF
                    val = parseInt(255 / (65535 / (val + 32768)))
                    data.setInt8(offset, val, true)
                }
            }
            else{
                for(var i = 0; i < bytes.length; i++, offset += 2){
                    var s = Math.max(-1, Math.min(1, bytes[i]))
                    data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
                }
            }

            return new Blob([ data ], { type: 'audio/wav' })
        }
    }

    // 开始录音
    this.start = function(){
        audioInput.connect(recorder)
        recorder.connect(context.destination)
    }
    this.isEmptyData = function(d){
        // 基本确定采样得到的语音数据是空，即没有语音输入
        // 非常简单的基于音量的端点检测算法
        // 这个循环加操作执行用时不超过1ms
        var l = Math.floor(d.length / 10)
        var vol = 0
        for(var i = 0; i < l; i++){
            vol += Math.abs(d[i * 10])
        }
        emptyCheckCount++
        if(vol < 10){
            emptyDatacount++

            if(emptyDatacount > 10){
                // recording = false;
                // this.stop();
                console.log('stoped')
                return true
            }
        }
        else{
            emptyDatacount = 0
        }
        return false
    }
    // 停止
    this.stop = function(){
        if(context.state === 'running'){
            context.close()
        }

        recorder.disconnect()
    }

    // 获取音频文件
    this.getBlob = function(){
        this.stop()
        return audioData.encodeWAV()
    }

    // 回放
    this.play = function(audio){
        audio.src = window.URL.createObjectURL(this.getBlob())
    }

    // 音频采集
    recorder.onaudioprocess = (e) => {
        audioData.input(e.inputBuffer.getChannelData(0))

        // console.log(this.isEmptyData(e.inputBuffer.getChannelData(0)))
        // record(e.inputBuffer.getChannelData(0));
    }
}
HZRecorder.setErrorInfoText = (errorMessage) => {
    HZRecorder.errorMessage = errorMessage
}

// 是否支持录音
HZRecorder.canRecording = (navigator.getUserMedia != null)
// 获取录音机
HZRecorder.get = function(callback, config){
    if(callback){
        if(navigator.getUserMedia){
            navigator.getUserMedia(
                { audio: true } // 只启用音频
                , function(stream){
                    let rec = new HZRecorder(stream, config)
                    callback(rec)
                }
                , function(error){
                    switch(error.code || error.name){
                    case 'PERMISSION_DENIED':
                    case 'PermissionDeniedError':
                        message.error('用户拒绝提供信息。')
                        break
                    case 'NOT_SUPPORTED_ERROR':
                    case 'NotSupportedError':
                        message.error('浏览器不支持硬件设备。')
                        break
                    case 'MANDATORY_UNSATISFIED_ERROR':
                    case 'MandatoryUnsatisfiedError':
                        message.error('无法发现指定的硬件设备。')
                        break
                    default:
                        // message.error("无法打开麦克风。异常信息:" + (error.code || error.name));
                        message.error('当前浏览器不支持录音功能。(建议使用Chrome)')
                        break
                    }
                })
        }
        else{
            message.error('当前浏览器不支持录音功能。')
        }
    }
}
export default HZRecorder
