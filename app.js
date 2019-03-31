(function (){
    'use strict'

    angular.module('app', [])
    .controller('firstCtrl', function($scope, dataFactory){
        $scope.title = 'API Integration';
        $scope.fields = ['id', 'title','body'];

        dataFactory.getData()
            .then((res)=>$scope.data = res.data),
                  (err) => console.log(err)
        // $scope.data = [
        //     {id: 1, title:'test', body:'body text'},
        //     {id: 2, title:'Safi Ahmad', body:'2nd Class'},
        //     {id: 3, title:'Wasi Ahmad', body:'Fourth Standard'},
        //     {id: 4, title:'Sami Mumtaz', body:'Six'},
        // ]
        $scope.sort = ((field) => {
            console.log(field)
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        });
        $scope.sort.field = 'title';
        $scope.sort.order = false;
    })
    .factory('dataFactory', function($http){
        return {
            getData : getData
        };
        function getData(){
            return $http.get('https://jsonplaceholder.typicode.com/posts')
        }
    })
    .filter('label', function label(){
        return function(inp){
            return titleText(inp);
        };
        function titleText(txt) {
            let temp = '';
            for(let i of txt.split(' ')){
               temp += i.charAt(0).toUpperCase() + i.slice(1) + ' ';
            }
            return temp;
          }
    });
})()