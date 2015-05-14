 eggHeadApp.controller('MainCtrl', ['$scope','localStorageService','$sce', function($scope, localStorageService, $sce) {
  getAllVideos = function(){
    lskeys = localStorageService.keys();
    //console.log(lskeys);
    $scope.videoLinks = [];
    lskeys = lskeys.sort(function(a,b){return a - b;});
    for(key in lskeys){
      $scope.videoLinks.push(localStorageService.get(lskeys[key]));
    }
  }


  assignId = function(){
    if(last_key == undefined){
      last_key = 0;
    }else{
      last_key = Number(last_key) + 1;
    }
    id = last_key;
  };

  getAllVideos();

  $scope.clearAll = function(){
    localStorageService.clearAll();
  };

  $scope.addVideo = function(){
    $('.addInput').val("");
    console.log('adding a video');
    submittedLink = $scope.videoLink;
    videoAddress = submittedLink.split('=')[1];
    newVideoLink = 'https://www.youtube.com/embed/'+videoAddress;

    prevKeys = localStorageService.keys().sort(function(a,b){return a-b;});//get existing keys (array)
    last_key = prevKeys[prevKeys.length - 1];//select last key (number)
    
    assignId();//give id to current entry (number)

    video = {
      videoId : id,
      title : $scope.videoTitle,
      link : newVideoLink,
      likes : 0
    } 

    if(id == 0){//no previous video in localstorage, currrent entry cant be a duplicate
      localStorageService.set(id, video);
      $scope.videoLinks.push(video);
      console.log('video added');
    }else{
      lastEntry = localStorageService.get(id-1);//get details of the last entry (object)
      if(lastEntry.link == video.link && lastEntry.title == video.title){
        //current entry is a duplicate of last entry, do not add it
      }else{
        localStorageService.set(id, video);
        $scope.videoLinks.push(video);
        console.log('video added');
      }
    } 


  };

  $scope.deleteVideo = function(id){
    $scope.text = 'A new  paragraph';
    videosArray = $scope.videoLinks;
    localStorageService.remove(id);
    for(i = 0; i < videosArray.length ; i++){
      if($scope.videoLinks[i].videoId == id){
        $scope.videoLinks.splice(i, 1);
      }
    }
  };

  $scope.likeVideo = function(id){
    likedVid = localStorageService.get(id);
    likedVid.likes += 1;
    localStorageService.remove(id);
    localStorageService.set(id, likedVid);
    videosArray = $scope.videoLinks;
    for(i = 0; i < videosArray.length ; i++){
      if(videosArray[i].videoId == id){
        $scope.videoLinks[i].likes += 1;
      }
    }
  };

  $scope.editVideoLink = '';
  $scope.editVideoTitle = '';
  $scope.editVideoId = '';

  $scope.editAVideo = function(id){
    oldVid = localStorageService.get(id);
    $scope.editVideoLink = oldVid.link;
    $scope.editVideoTitle = oldVid.title;
    $scope.editVideoId = id;

  };

  $scope.saveEditedVideo = function(){
    id = $scope.editVideoId;
    console.log(id);
    videoToEdit = localStorageService.get(id);
    videoToEdit.title = $scope.editVideoTitle;
    videoToEdit.link = $scope.editVideoLink;
    localStorageService.remove(id);
    localStorageService.set(id, videoToEdit);
  };

  
 

}])

.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

/*<!--<div ng-app="eggHeadApp">
  <div ng-controller="MainCtrl">
    <div id="addAVideo" class="modal fade" role="dialog" >
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Add a Video</h4>
          </div>
          <div class="modal-body">
            <form ng-submit="addVideo()">
              Title: <input type="text" name="title" ng-model="videoTitle"><br/><br/>
              Link: <input type="text" name="title" ng-model="videoLink"><br/><br/>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-success"  value="submit">
            <input type="submit" value="add">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
          </div>
          </form>
        </div>
      </div>
    </div><!--add a video ends-->
  </div>
</div>*/