/**
 * Created by vamsi on 5/18/16.
 */

class ConfigService{

    setConfig(config){
        this.config = config;
    }

    getWebRTCConfig(){
        return this.config.webRTC;
    }

    getConfig(){
        return this.config;
    }
}

export default ConfigService;