/**
 * Created by vamsi on 5/12/16.
 */

class previewController{
    constructor($scope, previewService, $state){
        this.$scope = $scope;
        this.$state = $state;
        this.previewService = previewService;
        this.loadPreview();

        $scope.startCall = this.startCall.bind(this);
    }

    onGetUserMedia(stream){
        this.$scope.localStream = stream;
        //rtcLogger.debug("stream: ", stream, stream.getAudioTracks(), stream.getVideoTracks());
        this.$scope.enableLocal = true;
        this.$scope.$digest();
        return this.previewService.queryDevices();
    }

    onGetDevices(){
        rtcLogger.debug("listDevices: ", arguments);
    }

    loadPreview(){
        const pr = this.previewService.getUserMedia(true, true);
        pr.then(this.onGetUserMedia.bind(this)).then(this.onGetDevices.bind(this)).catch(function(err){
            rtcLogger.debug("Error loading preview: ", err);
            //push error to UI
        })
    }

    startCall(){
        this.previewService.startCall();
        this.$state.go('main');
    }

}

previewController.$inject = ['$scope', 'previewService', '$state'];

export default previewController;