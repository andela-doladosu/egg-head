 eggHeadApp.controller('MainCtrl', ['$scope','localStorageService', function($scope, localStorageService) {

        $scope.save = function() {
          localStorageService.set('mySurname', 'Oladosu');
        }

        $scope.load = function() {
          lskeys = localStorageService.keys();
          $scope.data = '';
          $scope.titles = [];
          for(key in lskeys){
            $scope.data += localStorageService.get(lskeys[key])+' ';
            $scope.titles.push(localStorageService.get(lskeys[key]));
            console.log(lskeys[key]);
          }
        }
        
       // function submit(key, val) {
         //return

        //}
       
      }]);

