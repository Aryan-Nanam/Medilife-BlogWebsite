
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/mediDB", {useNewUrlParser: true , useUnifiedTopology: true});

const querySchema = {
  name : String,
  email : String,
  query : String
};

const Query = mongoose.model("Query", querySchema);

const memberSchema = {
  firstName : String,
  lastName : String,
  address: String,
  phnNo : Number,
  email : String,
  comment: String

};
const Member = mongoose.model("Member", memberSchema);

const donationSchema = {
  name : String,
  phome : Number,
  email : String
};

const Donation = mongoose.model("Donation", donationSchema)

app.get("/", function(req,res){
  res.render("home");
});

app.get("/news", function(req,res){
  res.render("news");
});

app.get("/products", function(req,res){
  res.render("products");
});

app.get("/queries", function(req,res){
  res.render("queries");
});

app.get("/joinus", function(req,res){
  res.render("joinus");
});

app.get("/redirect", function(req,res){
  res.render("redirect");
})

app.get("/donate", function(req,res){
  res.render("donate");
})

app.post("/query",function(req,res){
  const query = new Query({
    name: req.body.name,
    email: req.body.emailid,
    query: req.body.query,
  });

  query.save(function(err){
    if(!err){
      res.redirect("/redirect");
    }
  });
});

app.post("/joinus", function(req,res){
  const member = new Member({
    firstName : req.body.firstname,
    lastName : req.body.lastname,
    address: req.body.address,
    phnNo : req.body.phonenumber,
    email : req.body.email,
    comment: req.body.comment,
  });

  member.save(function(err){
    if(!err){
      res.redirect("/redirect");
    }
  });
});

app.post("/", function(req,res){
  res.redirect("/donate");
})

app.post("/donate",function(req,res){
  const donate = new Donation({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });
  donate.save(function(err){
    if(!err){
      res.redirect("/redirect");
    }
  });
})

app.post("/redirect", function(req,res){
  res.redirect("/")
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
