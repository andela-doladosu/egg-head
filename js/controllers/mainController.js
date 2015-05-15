 eggHeadApp.controller('MainCtrl', ['$scope','localStorageService','$sce', function($scope, localStorageService, $sce) {
  //Intially get all stored videos' details from localstorage
  getAllVideos = function(){
    //get stored keys into lskeys array
    lskeys = localStorageService.keys();
    //define array to hold video details which are objects
    $scope.videoLinks = [];
    //ensure the keys are in ascending order
    lskeys = lskeys.sort(function(a,b){return a - b;});
    //push objects into predefined array
    for(key in lskeys){
      $scope.videoLinks.push(localStorageService.get(lskeys[key]));
    }
  };

  //give unique id to a new entry
  assignId = function(){
    //if last_key is undefined, no video exists in local storage, set it to 0
    if(last_key == undefined){
      last_key = 0;
    }else{
      //increase last key by one
      last_key = Number(last_key) + 1;
    }
    //assign last key as id of video details to be saved to localstorage
    id = last_key;
  };

  getAllVideos();

  //replace youtube link from regular youtube ending '?v=njdmkj' to 'embed/njdmkj'
  getEmbedLink = function(givenLink){
    videoAddress = givenLink.split('=')[1];
    if(videoAddress){
      embedLink = 'https://www.youtube.com/embed/'+videoAddress;
    }else{
      embedLink = givenLink;
    }
    return embedLink;
  };

  $scope.frameClicked = function(){
    console.log('frame clicked');
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

    if(id == 0){
      //no previous video in localstorage, currrent entry cant be a duplicate
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
      $('#editVideoDiv,#editVideoBackDrop').show(500);
    });
  };

  $scope.comfirmDelete = function(id){
    for(i = 0; i < videosArray.length ; i++){
      if($scope.videoLinks[i].videoId == id){
        $scope.confirmDeleteTitle = $scope.videoLinks[i].title;
        $scope.idTodelete = $scope.videoLinks[i].videoId;
      }
    }
  };

  $scope.deleteVideo = function(){
    deleteId = $scope.idTodelete;
    $scope.videoLinks.splice(deleteId, 1);
    localStorageService.remove(deleteId);
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