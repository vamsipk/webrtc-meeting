/**
 * Created by vamsi on 5/13/16.
 */


//import Peer from './Peer'

class PeerService{
    constructor(webRTCService){
        this.peers = {};
        this.config = webRTCService.config;
        this.webRTCService = webRTCService;
    }

    get(id){
        if(!this.peers[id]){
            const peer = new RTCPeerConnection(this.config);

            peer.onaddstream = (event => {
                this.webRTCService.onRemoteStreamAdded.call(this.webRTCService, id, event.stream);
            });

            peer.ontrack = (event => {
                rtcLogger.debug("ontrack: ", event);
                //this.webRTCService.onRemoteStreamAdded.call(this.webRTCService, id, event.stream);
            });

            peer.onremovestream = (event => {
                this.webRTCService.onRemoteStreamRemoved.call(this.webRTCService, id, event.stream);
            });

            peer.onicecandidate = (event => {
                if(event.candidate){
                    peer.sdpMid = event.candidate.sdpMid;
                    peer.sdpMLineIndex = event.candidate.sdpMLineIndex;
                }
                this.webRTCService.onIceCandidate.call(this.webRTCService, id, event.candidate);
            });

            peer.oniceconnectionstatechange = (event => {
                this.webRTCService.onIceConnectionStateChange.call(this.webRTCService, id, event);
            });

            peer.onnegotiationneeded = (event =>  {
                rtcLogger.debug("onnegotiationneeded: ", event);
                this.webRTCService.onNegotiationNeeded.call(this.webRTCService, id, event);
            });

            peer.onsignalingstatechange = (event =>  {
                rtcLogger.debug("onsignalingstatechange: ", event, peer.signalingState);
            });

            peer.onicecandidateerror = (event =>  {
                rtcLogger.error("onicecandidateerror: ", event);
            });

            peer.onicegatheringstatechange = (event =>  {
                rtcLogger.debug("onicegatheringstatechange: ", event);
            });

            this.peers[id] = peer;
        }
        return this.peers[id];
    }

    close(id){
        const peer = this.peers[id];
        if(peer){
            peer.getRemoteStreams().forEach(stream => {
                stream.getTracks().forEach(track => track.stop());
            });
            peer.close();
        }
    }

    closeAll(){
        for(let id in this.peers){
            this.close(id);
        }
    }

}

export default PeerService;