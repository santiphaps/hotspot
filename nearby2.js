var x = document.getElementById("location");
var currentmap = document.getElementById("image_map");
var googleapikey ="AIzaSyC4Iwj-pSq0_Doofqge1DcLMEribFOAgqQ";
var openweathermapappid="39a68a9b3d3c054f885d432564169045";
var openweathermap_url="https://api.openweathermap.org/data/2.5/weather?units=metric&APPID=39a68a9b3d3c054f885d432564169045&lat=";
var googlestaticmap_url = "https://maps.googleapis.com/maps/api/staticmap?center=";
var googleplace_url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=100&type=cafe&keyword=&key=AIzaSyC4Iwj-pSq0_Doofqge1DcLMEribFOAgqQ&location=";
var googleplace_query = "";
var openweathermap_query="";
var googlepubsubtopic_url = "https://pubsub.googleapis.com/v1/projects/elevated-disk-193107/topics/testState:publish?key=AIzaSyCxVmJ5c2pmquUu4gqxRSpPdH5A5o-r5es";
var myLat, myLng, myTemp, myCity, myCountry;
var app = angular.module('myApp', []);
app.controller('dataCtrl', function($scope, $http) {
    $scope.currentDate = new Date();
    if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(position){
              $scope.$apply(function(){
                  $scope.myLat = position.coords.latitude;
                  myLat = position.coords.latitude;
                  $scope.myLng = position.coords.longitude;
                  myLng = position.coords.longitude;
                  $scope.map_url = googlestaticmap_url + position.coords.latitude + "," + position.coords.longitude + "&zoom=15&size=640x640&markers=size:mid%7C"+position.coords.latitude+","+position.coords.longitude + "&key=" + googleapikey;
                  openweathermap_query = openweathermap_url + position.coords.latitude + "&lon=" + position.coords.longitude;
                  googleplace_query = googleplace_url + position.coords.latitude + "," + position.coords.longitude;
                  $http.get(openweathermap_query)
                  .then(function(response) {
                      $scope.myWeather = response.data;
                      myTemp = response.data.main.temp;
                      myCity = response.data.name;
                      myCountry = response.data.sys.country;
                  });
                });
          });
      } else {
          alert("Please allow location");
      
      };
    $scope.tweet = function($scope){
        var clicktimestamp = new Date();
        var mytime = clicktimestamp.toString();
        var messagedata = window.btoa("Time: " + mytime);
        var params = { messages: [
             
            { 
            attributes: {
                Latitude : myLat.toString(),
                Longitude : myLng.toString(),
                City : myCity,
                Country : myCountry,
                Temperature: myTemp.toString()
            }, 
             
            data: messagedata }
        
        ] };
        $http.post(googlepubsubtopic_url,params)
        .then(function(response){
            alert("Message:" + JSON.stringify(response.data));
        },function(errormsg){
            alert(JSON.stringify(errormsg.data));

        });

    };
  });
  
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.98880329999,100.6186743&radius=100&type=cafe&keyword=&key=AIzaSyC4Iwj-pSq0_Doofqge1DcLMEribFOAgqQ
