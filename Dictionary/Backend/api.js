var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var translationSchema = new mongoose.Schema({
    word: String,
    verified: Boolean,
    translation: String
});
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    admin:Boolean
});
var sessionSchema = new mongoose.Schema({
        name:String,
        id:String,
    session:Boolean

    }
);
var sess = mongoose.model('Session', sessionSchema, 'data');
function setCookie(req, res) {
        // no: set a new cookie
        var randomNumber=Math.random().toString();
        randomNumber=randomNumber.substring(2,randomNumber.length);
        res.cookie('cookieName',randomNumber, { maxAge: 90000000, httpOnly: true });
        new sess({name:req.body.name,id:randomNumber, session:true}).save();
        console.log('cookie created successfully');

 //  next(); // <-- important!
};
var us = mongoose.model('User', userSchema, 'data');
var tr= mongoose.model('Translation', translationSchema, 'data');
exports.getTranslation = function(req, res) {
    tr.find({ word:	{
        $eq:req.body.word
    }}, function(err, translation) {
        if (err) throw err;
        else {

            console.log("Getting translation for", req.body);
            console.log(translation);

            res.send(translation);
        }

    });
};
exports.deltrans = function(req,res){
    tr.remove({ word:	{
        $eq:req.body.word
    }, verified:{$eq:req.body.verified}, translation:{$eq:req.body.translation}}, function(err, translation) {
        if (err) throw err;
        else {

            console.log("Deleted translation for", req.body.word);


        }

    });
};
exports.getList = function(req, res) {
    tr.find({ verified:	{
        $eq:req.body.verified
    }}, function(err, translation) {

            console.log(translation.length);
        res.send(translation);
    });
};
exports.checkA = function (req, res, next){
    sess.findOne({ id: {$eq:req.cookies.cookieName}, session:{$eq:true}}, function (err, session) {
        if (session) {
        us.findOne({name:{$eq: session.name}}, function (err, user) {
            if (user.admin) {
                next();
            } else {
                res.send('Access denied');
            }
        })
    }else{
            res.send('Access denied');
        }

    })
};
exports.checkU = function (req, res, next){
    sess.findOne({ id: {$eq:req.cookies.cookieName}, session:{$eq:true}}, function (err, session) {
        if (session) {
            us.findOne({name:{$eq: session.name}}, function (err, user) {
                if (!user.admin) {
                    next();
                } else {
                    res.send('Access denied');
                }
            })
        }else{
            res.send('Access denied');
        }

    })
};
exports.checkGuest = function(req, res, next){
    sess.findOne({ id: {$eq:req.cookies.cookieName}, session:{$eq:true}}, function (err, session) {
        if (session) {
            us.findOne({name:{$eq: session.name}}, function (err, user) {
                if (user.admin) {
                    res.redirect("/a.html");
                } else {
                    res.redirect("/u.html");
                }
            })
        }else{
            next();
        }

    })
};
exports.delSession = function(req,res){
    sess.remove({ id: {$eq:req.cookies.cookieName}, session:{$eq:true}}, function(err,removed) {
        console.log("Session deleted");
        res.redirect("/index.html")

    })

};

exports.uploadTranslation = function(req, res) {
    new tr({word: req.body.word, verified: req.body.verified, translation:req.body.verified}).save();
    console.log("Uploading Translation", req.body);


    res.send({
        success: true
    });
};
exports.addTranslation = function(req,res){
  new tr({word:req.body.word, verified:req.body.verified, translation:req.body.translation}).save();
  console.log("Uploading translation for ", req.body.word);
  res.send({
      success: true
  });

};
exports.redirectRegister = function(req, res){
    console.log("redirecting...");
    res.redirect("a.html")

};
exports.checkUser = function(req, res){
    us.find({ name:	{
        $eq:req.body.name
    }}, function(err, users) {
        if (err) throw err;
        else {
            var bool=false;
            if(users.length==0)bool=true;
            console.log("Checking user ", req.body);

            res.send(bool);
        }

    });
};
exports.addUser = function(req, res){
    bcrypt.hash(req.body.password, 10, function (err, hash){
        new us({name: req.body.name, password:req.body.password, admin:false}).save();
        console.log("Uploading New User", req.body.name," ", hash);
    });
    res.redirect("/");
};

exports.authorizeUser = function(req, res){
    bcrypt.hash(req.body.password, 10, function (err, hash){
        us.find({ name:	{
            $eq:req.body.name
        }
        }, function(err, users) {
            if(users.length!=0){
                users.forEach(function(a){
                    bcrypt.compare(a.password, hash, function(err, rees) {
                        if(rees) {
                            setCookie(req, res);
                            res.redirect("/");
                        }
                    });
                })
            }else{
                res.send(false);
            }
        })
    })

};
