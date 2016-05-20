/**
 * Created by vamsi on 5/12/16.
 */


// custom directive because src tag does not work with video
function html5src(){
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$on('setsrc', function(event, stream){
                //attr.$set('src', stream);
                element[0].srcObject = stream;
            })
        }
    }
}

export default html5src;