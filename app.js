const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");
const multer = require('multer');
// const contracterModel = require('./contracters');
const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/sepmLab", {useNewUrlParser: true,useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs")
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    passward: String
});
const userData = mongoose.model("user", userSchema);

const bankSchema = new mongoose.Schema({
  name: String,
  branch: String,
  hdfcCode: String,
  offer: String
});
const banks = mongoose.model("banks",bankSchema);

var contractStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: contractStorage });

app.get("/",(req,res)=>{
  res.render("index");
});
app.get("/aboutUs",(req,res)=>{
  res.render("aboutUs");
});




app.get("/sustainability",(req,res)=>{
  text = "";
  res.render("sustainability",{text});
});


// app.post("/sustainability", async(req,res)=>{
//   var k=0;
  
  
//   soilType =  req.body.soilType,
//   temperature =  req.body.temperature,
//   location =  req.body.location


//   const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI("AIzaSyDs3yX9eyK9hzMou5JwHQpOmvv8E5bNzto");

// // ...

// const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest"});
// const prompt = "I am a farmer and I have soil type " + soilType + ", temperature of " + temperature + " and location as " + location + ". Provide general recommendations on suitable crops for cultivation in " + location;
// console.log(prompt);
//   const result =  await model.generateContent(prompt);
//   const response = await result.response;
3
//   const text = response.text();
//   console.log("----------------------------");

//   console.log(text);

//   res.render("sustainability",{text});


// // ...
  
// });


app.get('/irrigation', (req, res) => {
  text = "";
  res.render("irrigation",{text});
});

// app.post("/irrigation", async(req,res)=>{
//   var k=0;
  
  
//   location =  req.body.location,
//   soilType =  req.body.soilType,
//   cropType =  req.body.cropType


//   const { GoogleGenerativeAI } = require("@google/generative-ai");


// const genAI = new GoogleGenerativeAI("AIzaSyDs3yX9eyK9hzMou5JwHQpOmvv8E5bNzto");



// const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest"});
// const prompt = "I am a farmer and I have location is " + location + ", soiltype  of " + soilType + " and cropType as " + cropType + ". general watering intervals and quantities " + location;
// console.log(prompt);
//   const result =  await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
  // console.log("----------------------------");
//   console.log(text);
//   res.render("irrigation",{text});


// // ...
  
// });

app.get('/weather', (req, res) => {
  text = "";
  res.render("weather",{text});
});

// app.post("/weather", async(req,res)=>{
//   var k=0;
  
  
//   precipitation =  req.body.precipitation,
//   temperature =  req.body.temperature,
//   location =  req.body.location


//   const { GoogleGenerativeAI } = require("@google/generative-ai");


// const genAI = new GoogleGenerativeAI("AIzaSyDs3yX9eyK9hzMou5JwHQpOmvv8E5bNzto");



// const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest"});
// const prompt = "I am a farmer and I have precipitation is " + precipitation + ", temperature  of " + soilType + " and location as " + location + "integrates weather forecast data" + location;
// console.log(prompt);
//   const result =  await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
//   res.render("weather",{text});


// // ...
  
// });


app.get('/tips', (req, res) => {
  text = "";
  res.render("tips",{text});
});

// app.post("/tips", async(req,res)=>{
//   var k=0;
  
  
//   water =  req.body.water,
//   fertilizer =  req.body.fertilizer,
//   pesticides =  req.body.pesticides


//   const { GoogleGenerativeAI } = require("@google/generative-ai");


// const genAI = new GoogleGenerativeAI("AIzaSyDs3yX9eyK9hzMou5JwHQpOmvv8E5bNzto");



// const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest"});
// const prompt = "I am a farmer and I have water type " + water + ", fertilizer of " + fertilizer + " and pesticides as " + pesticides + 
// ".  provides tips on efficient irrigation methods, fertilizer application techniques" + location;
// console.log(prompt);
//   const result =  await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
//   res.render("tips",{text});


// // ...
  
// });



app.get(".sustainability",(req,res)=>{
  res.render("sustainability");
});

app.get("/sign-up",(req,res)=>{
  res.render("signup");
});

app.post("/sign-up",(req,res)=>{
  var k=0;
  userData.find({},(err,users)=>{
    console.log("In here");
    console.log(k);
    for(var i=0;i<users.length;i++){
      if(users[i].username===req.body.username){
        k=1;
        console.log(k);
        res.redirect("/sign-up");
        break;
    }
  }
  console.log(k);

  });

  setTimeout(() => { console.log("World!");
  if(k===0){
    console.log(k);
    console.log("k not working");
    var phoneno = /^\d{10}$/;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if((re.test(String(req.body.username).toLowerCase()) ||  /^\d{10}$/.test(req.body.username)) && req.body.passward === req.body.Rpassward){
      let userdata= new userData({
        name: req.body.username,
        username: req.body.username,
        passward: req.body.passward
      })
      userdata.save(err=>{
        console.log(err);
      })

      res.redirect("/log-in");
      console.log(k);
    }else{
        res.redirect("/sign-up");
    }
  }
}, 2000);
});


app.get("/log-in",(req,res)=>{
    res.render("logIn")
});
app.post("/log-in",(req,res)=>{
    var k=true;
    var query = {username: req.body.username}
    console.log(query);
    userData.find({},(err,user)=>{
      console.log("Hi");
      for(var i=0;i<user.length;i++){
        console.log("lelele");
        if(user[i].username===req.body.username && user[i].passward===req.body.password){
          res.redirect("/");
          console.log("here");
          k=false
          break;
      }
    }

    })
    setTimeout(() => {
      if(k){
        res.redirect("/log-in")
      }},2000)

})




// app.get("/add-contract-details",function(req,res){
//   res.render("addContract");
// });
// app.post('/add-contract-details', upload.single('image'), (req, res, next) => {

//     var obj = new contracterModel({
//         name: req.body.name,
//         crop: req.body.crop,
//         requirnemt: req.body.requirnemt,
//         email: req.body.email,
//         amount: req.body.amount,
//         comments: req.body.comments,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     });
//     obj.save( err=>{
//       if(!err){
//         res.redirect("/contract-farming");
//       }else{
//         console.log(err);
//       }
//     })
// });

app.get("/contact-us",(req,res)=>{
  res.render("contactUs")
})
var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log("Server is liatening on port 3000");
});