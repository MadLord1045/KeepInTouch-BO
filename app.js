var express = require("express");
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
app.set('port', (process.env.PORT || 5000));
var bodyParser = require('body-parser'); // Charge le middleware de gestion des parametres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
/*var session = require('cookie-session'); // Charge le middleware de sessions

var ejs = require('ejs');
//*/
var users = [];
users[0] = { "login": "admin", "mdp": "admin" };
users[1] = { "login": "test", "mdp": "test", "contact": "1" };

var path = "http://localhost:5000/";

var contacts = {

	"1": {
		"nom": "ASSANY",
		"prenom": "Ylias",
		"mail": "ya.assany@gmail.com",
		"num": "00261348723658"

	},

	"00261348723658": {
		"nom": "ASSANY",
		"prenom": "Ylias",
		"mail": "ya.assany@gmail.com",
		"num": "00261348723658"

	},
	"00261348723659": {
		"nom": "ASSANY",
		"prenom": "Yvan",
		"mail": "ya.assany@gmail.com",
		"num": "00261348723659"
	}
};


app.use(cookieParser());
app.use(session({ secret: "Touch it" }));
app.use(urlencodedParser);
app.use(express.static(__dirname + '/public'));


app.get("/", function (req, res) {
	res.render("index.ejs", { "data": {} });
});//*/

app.get("/login", (req, res) => {
	res.render("index.ejs", { "data": {} });
});

app.post("/login", (req, res) => {
	var login = (req.body.login) ? req.body.login : "";
	var mdp = req.body.mdp;
	users.forEach((item, index, any) => {
		if (item.login == login && item.mdp == mdp) {
			data = { "user": item, "contact": contacts[item.contact] };
			req.session.useData = data;
			res.redirect("profile");
		}

		else if (index == users.length - 1) {
			res.render("index.ejs", { "data": { "error": "Combinaison login / mot de passe invalide", "login": login } })
		}
	});



});

app.get("/register", (req, res) => {
	res.render("register.ejs", { "data": { "data": {}, "errors": [] } });
});

app.post("/register", (req, res) => {
	var data = {};
	var err = [];
	var i = 0;
	data["login"] = req.body.login;
	data["mdp"] = req.body.mdp;
	data["nom-contact"] = req.body["nom-contact"];
	data["telephone"] = req.body.telephone;
	for (var ind in data) {
		if (data[ind] == null || data[ind] == "") {
			err[i] = "" + ind + " manquant";
			i++;
		}
	}//*/
	users.forEach((item, index, any) => {
		if (item.login == data["login"]) {
			err[i] = "Nom d'utilisateur déjà utilisé";
			i++;
		}
	});

	data["mail"] = req.body.mail;
	data["societe"] = req.body.societe;

	if (err.length > 0) {

		res.render("register.ejs", { "data": { "data": data, "errors": err } });
	}
	else {
		var contact;
		var user;
		var max = Object.keys(contacts).length;
		var test = true
		while (test) {
			if (!contacts["" + max]) {
				test = !test;
				contact = {
					"nom": data["nom-contact"],
					"prenom": "",
					"mail": data["mail"],
					"num": data["telephone"]
				}
				contacts["" + max] = contact

			}
			else
				max++;
		}
		user = {
			"login": data["login"],
			"mdp": data["mdp"],
			"contact": "" + max
		}
		users.push(user);
		useData = { "user": user, "contact": contact };
		req.session.useData = useData;
		res.redirect("/profile");
	}
});

app.get("/profile", (req, res) => {
	
	if (req.session.useData == null) {
		res.redirect("/login");
	}
	else {
		var data = req.session.useData;
		res.render("profile.ejs", { "data": data });

	}
});

app.get("/logout",(req,res)=>{
	req.session.destroy((err)=>{
		res.redirect("/");
	});
})

app.get("/contact/:id", function (req, res) {
	var id = req.params.id;
	if (id == null || contacts[id] == null)
		res.json({ error: "ce num??ro n'est pas enregistr??" });
	else {
		res.json({ contact: contacts[id] });
	}
});

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
	console.log('link: http://localhost:5000/');
});
