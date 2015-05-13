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

  getAllVideos();

  assignId = function(){
    if(last_key == undefined){
      last_key = 0;
    }else{
      last_key = Number(last_key) + 1;
    }
    id = last_key;
  };

  $scope.clearAll = function(){
    localStorageService.clearAll();
  };

  $scope.addVideo = function(){

    prevKeys = localStorageService.keys().sort(function(a,b){return a-b;});//get existing keys (array)
    last_key = prevKeys[prevKeys.length - 1];//select last key (number)
    
    assignId();//give id to current entry (number)

    video = {
      videoId : id,
      title : $scope.videoTitle,
      link : $scope.videoLink,
      likes : 0
    } 

    if(id == 0){//no previous video in localstorage, currrent entry cant be a duplicate
      localStorageService.set(id, video);
      $scope.videoLinks.push(video);
    }else{
      lastEntry = localStorageService.get(id-1);//get details of the last entry (object)
      if(lastEntry.link == video.link && lastEntry.title == video.title){
        //current entry is a duplicate of last entry, do not add it
      }else{
        localStorageService.set(id, video);
        $scope.videoLinks.push(video);
      }
    }
    //getAllVideos();
    
  }

  $scope.deleteVideo = function(id){
    videosArray = $scope.videoLinks;
    localStorageService.remove(id);
    for(i = 0; i < videosArray.length ; i++){
      if($scope.videoLinks[i].videoId == id){
        $scope.videoLinks.splice(i,1);
      }
    }
  }  

  $scope.likeVideo = function(id){
    likedVid = localStorageService.get(id);
    console.log(id);
    likedVid.likes += 1;
    localStorageService.remove(id);
    localStorageService.set(id, likedVid);
    //$scope.videoLinks[id].likes += 1;
    videosArray = $scope.videoLinks;
    for(i = 0; i < videosArray.length ; i++){
      if(videosArray[i].videoId == id){
        $scope.videoLinks[i].likes += 1;
      }
    }
    console.log(videosArray);
  };

  $scope.actionKey = function(){
    prevKeys = localStorageService.keys();
    last_key = prevKeys[prevKeys.length - 1];
    assignId();
    lastEntry = localStorageService.get(id-1);
  }  


 // function submit(key, val) {
   //return

  //}
 
}])

.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);