var express=require("express");
var path=require("path");
const app=express();
const port=process.env.PORT ||3000;
//  for hbs and importing other js files 
const hbs=require("hbs");
const request=require("request");
var geocode=require("./utils/geocode.js");
var forecast=require("./utils/forecast.js");

// for setting up paths for express usage//////////////////////////////
const publicDirectoryPath=path.join(__dirname,"../public");
const viewsPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials")

// set up handlebars and views location/////////////////////////////////
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
//console.log(__dirname);
//console.log(__filename);

//setup directory to use//////////////////////////////////////////////
app.use(express.static(publicDirectoryPath));

//for rendering home & about  page for view from index//////////////////////////////
app.get("",(req,res)=>{
    res.render('index',{
        title :"Weather app",
        name :"pranjal"
    });
});
app.get("/about",(req,res)=>{

    res.render("about",{
        title : "About Me",
        name :"Pranjal Kulshrestha"
    });
    
    });
//for rendering help page////////////////////////////////////////////////////////
app.get("/help",(req,res)=>{
  res.render("help",{
      msg: "You are now on help page,choose the options!!",
      title: "Help",
      name : "Pranjal"
  })
});

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title : "404",
        name : "Pranjal",
        errorMessage : "Help Article Not Found."
    });
})

// (app.com/weather)-->main http request///////////////////////////////////////

app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error : "You must provide an address"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
         if(error)
         {
          return res.send({error:error});
         }
       ////calling forecast function for location we got////////
       forecast(latitude,longitude,(error,forecastData)=>{
        if(error)
        {
         return res.send({error:error});
        }
          res.send({
              forecast : forecastData,
              location : location,
              address :req.query.address
          });
       });
         
    });

});

// for 404 error//////////////////////////////////////////////////////////////

app.get("*",(req,res)=>{
res.render("404",{
    title : "404",
    name : "Pranjal",
    errorMessage : "Page Not Found."
});
});

/////////////setting up port 3000///////////////////////////////////////////////

app.listen(port,()=>{
    console.log("server has started on port "+port);
});