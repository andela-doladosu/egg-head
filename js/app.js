var eggHeadApp = angular.module('egghead', ['LocalStorageModule','ngSanitize']);



$(document).ready(function(){
  
  $('#addNewVideo').click(function(){
    $('#addVideoDiv,#addVideoBackDrop').toggle(500);
    $('.form-control').val("");
  });

  $('#addVideoButton').click(function(){
    $('#addVideoDiv,#addVideoBackDrop').toggle(500);
  });

  $('.editButton').on('click',function(){
    $('#editVideoDiv,#editVideoBackDrop').toggle(500);
  });

  $('.deleteButton').on('click',function(){
    $('#deleteVideoDiv,#deleteVideoBackDrop').show(500);
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

   $('#deleteVideoButton,#cancelDeleteButton').click(function(){
    $('#deleteVideoDiv,#deleteVideoBackDrop').hide(500);
  });

});
