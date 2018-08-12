var x = document.getElementById("location");
var b = document.getElementById("what_button");
var currentmap = document.getElementById("image_map");
var googleapikey ="AIzaSyC4Iwj-pSq0_Doofqge1DcLMEribFOAgqQ";
var googlestaticmap_url = "https://maps.googleapis.com/maps/api/staticmap?center=";
var googleplace_url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=100&type=cafe&keyword=&key=AIzaSyC4Iwj-pSq0_Doofqge1DcLMEribFOAgqQ&location=";
var googleplace_query = "";

$(document).ready(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
})

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.98880329999,100.6186743&radius=100&type=cafe&keyword=&key=AIzaSyC4Iwj-pSq0_Doofqge1DcLMEribFOAgqQ

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    " Longitude: " + position.coords.longitude; 
    
    googleplace_query = googleplace_url + position.coords.latitude + "," + position.coords.longitude;
    // var request = new XMLhttprequest .. 
    map_url = googlestaticmap_url + position.coords.latitude + "," + position.coords.longitude + "&zoom=15&size=640x640&key=" + googleapikey;
    currentmap.src = map_url;

}