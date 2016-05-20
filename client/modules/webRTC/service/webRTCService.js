/**
 * Created by vamsi on 5/12/16.
 */


import * as adapterUtils from 'webrtc-adapter'

import Message from '../../message/message'

import PeerService from './PeerService'

class WebRTCService{
    constructor(connectService){
        this.connectService = connectService;
        this.localStream = null;
        this.remoteStreams = [];
        this.audioInputDevices = [];
        this.audioOutputDevices = [];
        this.videoInputDevices = [];

        //this.config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

        this.peerService = new PeerService(this);

        connectService.setWebRTCMessageHandler(this.onMessage.bind(this));

        this.remoteStreamAddedHandlers = [];
        this.remoteStreamRemovedHandlers = [];
    }

    setConfig(config){
        this.config = config;
    }

    listDevices(devices){
        for(let i=0; i< devices.length; i++) {
            const device = devices[i];
            if (device.kind === 'audioinput') {
                this.audioInputDevices.push(device);
            } else if (device.kind === 'audiooutput') {
                this.audioOutputDevices.push(device);
            } else if (device.kind === 'videoinput') {
                this.videoInputDevices.push(device);
            } else {
                rtcLogger.debug('unknown: ', device);
            }
        }

        const deviceObj = {audioInputDevices: this.audioInputDevices,
            audioOutputDevices: this.audioOutputDevices,
            videoInputDevices: this.videoInputDevices};
        return deviceObj;
    }

    queryDevices(){
        return navigator.mediaDevices.enumerateDevices()
            .then(this.listDevices.bind(this))
            .catch(err => {
                return err;
            });
    }

    getLocalStream(){ return this.localStream; }

    getRemoteStreams(){
        return this.remoteStreams;
    }

    getVideoInputDevices(){ return this.videoInputDevices; }

    getAudioInputDevices(){ return this.audioInputDevices; }

    getAudioOutputDevices(){ return this.audioOutputDevices; }

    getUserMedia(){
        return  navigator.mediaDevices.getUserMedia(this.config.mediaConstraints)
            .then(stream => {
                this.localStream = stream;
                return stream;
            })
            .catch(err => {
                rtcLogger.error("Error getting user: ", err);
                return err;
            });
    }

    startCall(address){
        rtcLogger.info("startCall: ", address, this);
        const mediaConstraints = this.config.mediaConstraints;
        const msg = Message('request_offer', mediaConstraints);
        this.connectService.sendWebRTCMessage(msg);
    }

    stopCall(){
        this.localStream.getTracks().forEach(track => {
            track.stop();
        });
        this.peerService.closeAll();
    }

    onMessage(message){
        if(!message || !message.from){
            rtcLogger.error("Invalid message: ", message);
            return;
        }
        const id = message.from;
        rtcLogger.debug("message: ", id, message);
        const pc = this.peerService.get(id);
        const msgData = message.data;
        switch (message.type){
            case 'request_offer':
            {
                pc.addStream(this.localStream);

                const offerOptions = {offerToReceiveAudio: 0, offerToReceiveVideo: 0};
                if(msgData.audio){
                    offerOptions.offerToReceiveAudio = 1;
                }
                if(msgData.video){
                    offerOptions.offerToReceiveVideo = 1;
                }
                pc.createOffer(offerOptions)
                    .then(description => {
                        rtcLogger.trace(description);
                        return pc.setLocalDescription(description);
                    })
                    .then(() => {
                        rtcLogger.trace("SetLocalDescription success");
                        const msg = Message('offer', pc.localDescription, id);
                        this.connectService.sendWebRTCMessage(msg);
                    })
                    .catch(err => {
                        rtcLogger.error("Error: ", err);
                        return err;
                    })
                break;
            }
            case 'offer':
            {
                pc.addStream(this.localStream);
                pc.setRemoteDescription(new RTCSessionDescription(msgData))
                    .then(() => {
                        rtcLogger.trace("After setting remote description...creating answer");
                        return pc.createAnswer();
                    })
                    .then(description => {
                        rtcLogger.trace("Created answer...setting local description with answer: ", description);
                        return pc.setLocalDescription(description)
                    })
                    .then(() => {
                        rtcLogger.trace("SetLocalDescription success");
                        const msg = Message('answer', pc.localDescription, id);
                        this.connectService.sendWebRTCMessage(msg);
                    })
                    .catch(err => {
                        rtcLogger.error("Error in processing offer: ", err);
                        return err;
                    });
                break;
            }
            case 'answer':
            {
                pc.setRemoteDescription(new RTCSessionDescription(msgData))
                    .then(() => {
                        rtcLogger.debug("Processed answer successfully");
                    })
                    .catch(err => {
                        rtcLogger.error("Error in processing answer: ", err);
                    })
                break;
            }
            case 'icecandidate':
            {
                const candidate = new RTCIceCandidate(msgData);
                pc.addIceCandidate(candidate)
                    .then(() => {
                        rtcLogger.debug("Added ice candidate successfully");
                    })
                    .catch(err => {
                        rtcLogger.error("Error adding ice candidate: ", err, message.candidate);
                    });
                break;
            }
            default:
                break;
        }
    }

    onIceCandidate(id, candidate){
        rtcLogger.debug("onIceCandidate: ", id, candidate);
        if(!candidate || candidate.candidate.indexOf("endOfCandidates") != -1){
            rtcLogger.debug("End of candidates");
            return;
        }

        const msg = Message('icecandidate', candidate, id);
        this.connectService.sendWebRTCMessage(msg);
    }

    onIceConnectionStateChange(id, event){
        const pc = this.peerService.get(id);
        rtcLogger.debug("onIceConnectionStateChange: ", id, event, pc.iceConnectionState);
    }

    onRemoteStreamAdded(id, stream){
        rtcLogger.debug("onRemoteStreamAdded: ", id, stream);
        this.remoteStreams.push(stream);
        this.remoteStreamAddedHandlers.forEach(handler =>{
            handler(stream);
        })
    }

    onRemoteStreamRemoved(id, stream){
        rtcLogger.debug("onRemoteStreamRemoved: ", id, stream);
        for(let i=0; i < this.remoteStreams.length; i++){
            if(stream.id == this.remoteStreams[i].id){
                this.remoteStreams.splice(i, 1);
                break;
            }
        }
        this.remoteStreamRemovedHandlers.forEach(handler =>{
            handler(stream);
        })
    }

    onNegotiationNeeded(id, event){
        rtcLogger.debug("onNegotiationNeeded: ", id, event);
    }

    setRemoteStreamAddedHandler(handler){
        this.remoteStreamAddedHandlers.push(handler);
    }

    setRemoteStreamRemovedHandler(handler){
        this.remoteStreamRemovedHandlers.push(handler);
    }

}

WebRTCService.$inject = ['connectService'];

export default WebRTCService;
