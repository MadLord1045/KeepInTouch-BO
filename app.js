var express = require("express");
var app = express();
app.set('port',(process.env.PORT || 5000));
var bodyParser = require('body-parser'); // Charge le middleware de gestion des parametres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
/*var session = require('cookie-session'); // Charge le middleware de sessions

var ejs = require('ejs');
//*/
var users=[];
users[0]={"login": "admin", "passwd" : "admin"} ;

var movies=[];
var path="http://localhost:3700/";

var contacts={
	"00261348723658":{
		"nom":"ASSANY",
		"prenom":"Ylias",
		"mail":"ya.assany@gmail.com",
		"num":"00261348723658"
		
	},
	"00261348723659":{
		"nom":"ASSANY",
		"prenom":"Yvan",
		"mail":"ya.assany@gmail.com",
		"num":"00261348723659"
	}
};

var questions={
	"1":{
		"question":"Qui suis-je?",
		"url_image":"1.jpg",
		"author":"MadLord",
		"responses":{
			"0":"Roshan",
			"1":"John Travolta"
		},
		"ind_reponse":"",

	},
	"2":{
		"question":"Qui suis-je?",
		"url_image":"2.jpg",
		"author":"MadLord",
		"responses":{
			"0":"Roshan",
			"1":"John Travolta"
		},
		"ind_reponse":"0",

	}
}

app.use(urlencodedParser);
app.use(express.static(__dirname + '/public'))


app.get("/", function(req, res){
	res.render("error.ejs")
});//*/
app.get("/contact/:id", function(req, res){
	var id=req.params.id;
	if(id==null || contacts[id]==null)
		res.json({error:"ce num??ro n'est pas enregistr??"});
	else {
		res.json({contact:contacts[id]});
	}
});

app.get("/list", function(req, res){
	res.json(questions);
});
app.post("/question",function(req,res){
	var id=questions;
	var question=body.params.id;
	var author=body.params.id;
	var reponses=body.params.id;
	var url_image=body.params.id;
	var ind_reponse=body.params.id;


});
//*/
/*
app.post("/addContact", function(req, res){
	let sender=req.body.sender;
	let contact=req.body.sender;
	if(sender!=null && contact!=null){
		if(contacts[sender]!=null && contacts[contact] !=null){
			let temp=contacts[sender].contacts[contact];
			if(!temp){
				temp=true;
				res.json({"contact":contacts[contact]});
			}
		}
	}
	res.json({"contact":null});

});

app.post("/register", function(req, res){
	if(req.body.passwd && req.body.login && req.body.mail && req.body.nom)
	{
		var newUser={
			"login":req.body.login,
			"passwd" : req.body.passwd,
			"mail":req.body.mail,
			"nom":req.body.nom
		}
		users[users.length]=newUser;
		console.log(users);
		return res.json({"register" : true});
	}
	return res.json({"register" : false});
});

app.get("/list",function(req,res){
	return res.json({"movies" : movies});
});
//*/

app.listen(app.get('port'),function() {
  console.log('Node app is running on port', app.get('port'));
});
