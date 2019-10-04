var request =require("request");

// function to get the coordinates of location
var geocode=(address,callback)=>{

    var url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicHJhbmphbC1rdWxzaHJlc3RoYSIsImEiOiJjazB4bnZsZGEwODR0M21sZDA1aWkwbXFoIn0.ZtFVnBl8kLk4WliIkP8f-A&limit=1";
    request({url :url,json:true},(error,response)=>{
    
      if(error)
      {
        callback("unable to connect to location services",undefined);
      }
    else if(response.body.features.length===0)
    {
      callback("unable to search this place,Please provide a valid location.",undefined);
    }
    else{   
    var latitude=response.body.features[0].center[1];
    var longitude=response.body.features[0].center[0];
    var loc={
      latitude : latitude,
      longitude:longitude,
      location : response.body.features[0].place_name
    };
    callback(undefined,loc);
    }
    });
    ;}
    module.exports=geocode;
