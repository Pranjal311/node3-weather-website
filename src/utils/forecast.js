var request=require("request");

var forecast=(latitude,longitude,callback)=>
{
   var url="https://api.darksky.net/forecast/0d16629c7aea4768b0f42ad7667daf26/"+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"?units=si";
  request({url : url,json:true},(error,response)=>{
  if(error)
  {
      callback("unable to connect to weather services",undefined);
  }
  else if(response.body.error)
  {
      callback("not a valid location is entered",undefined);
  }
else{
   var current_data="It is currently "+response.body.currently.temperature+" degrees out.There is "+response.body.currently.precipProbability+" %chances of rain.";
   callback(undefined,current_data);
}
  });
};
module.exports=forecast;