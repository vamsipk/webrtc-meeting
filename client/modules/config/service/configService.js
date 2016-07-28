/**
 * Created by vamsi on 5/18/16.
 */

import {browserDetails} from 'webrtc-adapter'
class ConfigService{

    setConfig(config){
        this.config = config;
        // apply browser capable constraints
        if(browserDetails.browser === 'edge'){
            this.config.webRTC.mediaConstraints.video = false;
        }
    }

    getWebRTCConfig(){
        return this.config.webRTC;
    }

    getConfig(){
        return this.config;
    }
}

export default ConfigService;