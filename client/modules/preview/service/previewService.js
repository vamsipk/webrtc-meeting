/**
 * Created by vamsi on 5/12/16.
 */

import {browserDetails} from 'webrtc-adapter'
class PreviewService{
    constructor(webRTCService, configService, $q){

        this.webRTCService = webRTCService;
        this.webRTCService.setConfig(configService.getWebRTCConfig());
        this.$q  = $q;
    }

    queryDevices(){
        return this.webRTCService.queryDevices();
    }

    getUserMedia(audioEnabled, videoEnabled){
        const constraints = {audio: audioEnabled, video: videoEnabled};
        if(browserDetails.browser === 'edge'){
            constraints.video = false;
        }
        this.webRTCService.config.mediaConstraints = constraints;
        return this.webRTCService.getUserMedia();
    }

    startCall(){
        //get address
        const address = null;
        this.webRTCService.startCall(address);
    }
}

PreviewService.$inject = ['webRTCService', 'configService', '$q'];

export default PreviewService;
