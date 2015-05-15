 eggHeadApp.controller('MainCtrl', ['$scope','localStorageService','$sce', function($scope, localStorageService, $sce) {
  //Intially get all stored videos' details from localstorage
  getAllVideos = function(){
    lskeys = localStorageService.keys();//get stored keys into lskeys array
    $scope.videoLinks = [];//define array to hold video details which are objects
    lskeys = lskeys.sort(function(a,b){return a - b;});//ensure the keys are in ascending order
    for(key in lskeys){
      $scope.videoLinks.push(localStorageService.get(lskeys[key]));//push objects into predefined array
    }
  };

  //give unique id to a new entry
  assignId = function(){
    if(last_key == undefined){//if last_key is undefined, no video exists in local storage, set it to 0
      last_key = 0;
    }else{
      last_key = Number(last_key) + 1;//increase last key by one
    }
    id = last_key;
  };

  getAllVideos();

  $scope.clearAll = function(){
    localStorageService.clearAll();
    $scope.videoLinks = [];
  };

  getEmbedLink = function(givenLink){
    videoAddress = givenLink.split('=')[1];
    embedLink = 'https://www.youtube.com/embed/'+videoAddress;
    return embedLink;
  };

  $scope.addVideo = function(){
    $('.addInput').val("");
    submittedLink = $scope.videoLink;
    newVideoLink = getEmbedLink(submittedLink);
    
    

    prevKeys = localStorageService.keys().sort(function(a,b){return a-b;});//get existing keys (array)
    last_key = prevKeys[prevKeys.length - 1];//select last key (number)
    
    assignId();//give id to current entry (number)

    video = {
      videoId : id,
      title : $scope.videoTitle,
      link : newVideoLink,
      likes : 0
    } 

    console.log(video);    

    if(id == 0){//no previous video in localstorage, currrent entry cant be a duplicate
      localStorageService.set(id, video);
      $scope.videoLinks.push(video);
      console.log('first video added');
    }else{
      lastEntry = localStorageService.get(id-1);//get details of the last entry (object)
      if(lastEntry.link == video.link && lastEntry.title == video.title){
        //current entry is a duplicate of last entry, do not add it
      }else{
        localStorageService.set(id, video);
        $scope.videoLinks.push(video);
        console.log('next video added');
      }
    } 

  };

  $scope.showEditBox = function(){
    $('.editButton').on('click',function(){
      $('#editVideoDiv,#editVideoBackDrop').toggle(500);
    });
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
    $('.editButton').click(function(){
    $('#editVideoDiv,#editVideoBackDrop').show(500);});
    console.log(id);
    oldVid = localStorageService.get(id);
    $scope.editVideoLink = oldVid.link;
    $scope.editVideoTitle = oldVid.title;
    $scope.editVideoId = id;
  };

  $scope.saveEditedVideo = function(){
    id = $scope.editVideoId;
    videoToEdit = localStorageService.get(id);
    videoToEdit.title = $scope.editVideoTitle;
    videoToEdit.link = $scope.editVideoLink;
    videosArray = $scope.videoLinks;
    for(i = 0; i < videosArray.length ; i++){
      if(videosArray[i].videoId == id){
        $scope.videoLinks[i].link = getEmbedLink(videoToEdit.link);
        $scope.videoLinks[i].title = videoToEdit.title;
        console.log('name changed');
      }
    }
    localStorageService.remove(id);
    localStorageService.set(id, videoToEdit);
  };

}])

.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);