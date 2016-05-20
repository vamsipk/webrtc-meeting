/**
 * Created by vamsi on 5/15/16.
 */

class VideoLayoutService{
    constructor($rootScope, webRTCService){
        this.$rootScope = $rootScope;
        this.webRTCService = webRTCService;

        this.webRTCService.setRemoteStreamAddedHandler(this.onVideoAdded.bind(this));
        this.webRTCService.setRemoteStreamRemovedHandler(this.onVideoRemoved.bind(this));

        this.localStream = webRTCService.getLocalStream();
        this.remoteStreams = webRTCService.getRemoteStreams();
    }

    onVideoAdded(video){
        rtcLogger.trace("video added: ", video);
        this.localStream = this.webRTCService.getLocalStream();
        this.$rootScope.$apply();
    }

    onVideoRemoved(video){
        rtcLogger.trace("video removed: ", video);
        this.remoteStreams = this.webRTCService.getRemoteStreams();
        this.$rootScope.$apply();
    }

    getRemoteStreams(){
        return this.remoteStreams;
    }

    getLocalStream(){
        return this.localStream;
    }
}

VideoLayoutService.$inject = ['$rootScope', 'webRTCService'];

export default VideoLayoutService;
