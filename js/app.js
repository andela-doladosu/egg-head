var eggHeadApp = angular.module('egghead', ['LocalStorageModule','ngSanitize']);



$(document).ready(function(){
  $('#addNewVideo').click(function(){
    $('#addVideoDiv,#addVideoBackDrop').toggle(500);
  });

  $('#addVideoButton').click(function(){
    $('#addVideoDiv,#addVideoBackDrop').toggle(500);
  });

  $('.editButton').click(function(){
    $('#editVideoDiv,#editVideoBackDrop').toggle(500);
  });

  $('#saveVideoButton').click(function(){
    $('#editVideoDiv,#editVideoBackDrop').toggle(500);
  });

  $('.cancelEditVideo').click(function(){
    $('#editVideoDiv,#editVideoBackDrop').toggle(500);
  });

  $('.cancelAddButton').click(function(){
    $('#addVideoDiv,#addVideoBackDrop').toggle(500);
  });

});
