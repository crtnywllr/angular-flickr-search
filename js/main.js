angular.module('myApp', [])
    .controller('flickrCtrl', function ($scope, $http, $q, $timeout) {
        $scope.isSearching = false;
        $scope.resultsFound = false;
        $scope.results = [];

        $scope.search = function () {
            $scope.isSearching = true;
            $scope.resultsFound = false;
            var url = "https://api.flickr.com/services/rest";
            var request = {
                method: 'flickr.photos.search',
                api_key: 'bf549a5208bf9fe6b0f1d3b0bf9913cc',
                tags: $scope.searchTerm,
                sort: 'relevance',
                page: '1',
                per_page: '20',
                format: 'json',
                nojsoncallback: 1

            };

            $http({
                    method: 'GET',
                    url: url,
                    params: request
                })
                .success(function (data) {
                    $scope.isSearching = false;
                    $scope.resultsFound = true;
                    $scope.results = data;
                    console.log($scope.results);
                    console.log($scope.results.photos.photo.length);
                    $scope.numImages = $scope.results.photos.photo.length;
                }).error(function (error) {
                    $scope.isSearching = true;
                    $scope.resultsFound = false;
                    console.error('error');
                });
        };
    });
