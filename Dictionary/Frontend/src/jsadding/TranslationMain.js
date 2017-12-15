var Templates = require('../Templates');
var TranslationsToShow=[];


var $list = $(".translationContainer");

var API = require("../API");
exports.initManage = iii();
function iii(){
    var $adminlist=$(".manageContainer");
    TranslationsToShow=[];
    var body ={
        verified:false
    };
    API.getList(body, function (err, data) {
        if(data.length>0){
            for(var i=0; i<data.length; i++){
                TranslationsToShow.push({word: data[i].word, verified:data[i].verified, translation:data[i].translation});
            }


        }
        TranslationsToShow.forEach(function(a){
            var html_code = Templates.TranslationList_OneItem(a);
            var node = $(html_code);
            node.find(".del").click(function(){
                var body={
                    word : node.find(".translationWord").text(),
                translation : node.find(".translation").text(),
                    verified:false
                };

                API.delTrans(body, function(err, data){

                });
                window.location="/amanage.html";

            });
            node.find(".ver").click(function(){
                var body={
                    word:node.find(".translationWord"),
                    translation : node.find(".translation").text(),
                    verified:false
                }
                API.delTrans(body, function(err, data){

                });
                body.verified=true;
                API.addTranslation(body, function(err,data){

                });
                window.location="/amanage.html";
            })
            $(".no").css("visibility","visible");
            $adminlist.append(node);
        })
    });
    if(TranslationsToShow.length==0) $(".no").css("visibility","hidden");
    TranslationsToShow=[];
};

$(".searchBtn").click(function(){
    $list.html("");
    TranslationsToShow=[];
    var body= {
        word: $(".mainSearch").val(),
        verified: true

    };
    API.getTranslation(body, function (err, data) {
        if(data.length>0){
            for(var i=0; i<data.length; i++){
                TranslationsToShow.push({word: data[i].word, verified:data[i].verified, translation:data[i].translation});

            }



        }
        TranslationsToShow.forEach(function(a){
            var html_code = Templates.TranslationMain_OneItem(a);
            var node = $(html_code);
            $list.append(node);
        })
    });

        if(TranslationsToShow.length==0) $(".no").css("visibility", "hidden");
        else $(".no").css("visibility", "hidden");
    TranslationsToShow=[];
});
$(".searchBtna").click(function(){
    $list.html("");
    TranslationsToShow=[];
    var body= {
        word: $(".mainSearch").val(),
        verified:true

    };
    API.getTranslation(body, function (err, data) {
        if(data.length>0){
            for(var i=0; i<data.length; i++){
                TranslationsToShow.push({word: data[i].word, verified:data[i].verified, translation:data[i].translation});
            }



        }
        TranslationsToShow.forEach(function(a){
            var html_code = Templates.TranslationMainA_OneItem(a);
            var node = $(html_code);
            $list.append(node);
            node.find(".removE").click(function(){
                var body={
                    word : node.find(".translationWord").text()-"X",
                    translation : node.find(".translation").text(),
                    verified:true

                };
                alert(body.word);

                API.delTrans(body, function(err, data){
                    alert("lul");
                    if(!err)node.remove();

                });
                window.location="/a.html";

            });
        })
    });

    if(TranslationsToShow.length==0) $(".no").css("visibility", "hidden");
    else $(".no").css("visibility", "hidden");
    TranslationsToShow=[];
});
$(".registerShow").click(function(){
   window.location="/register.html";
});
$(".signInShow").click(function(){
   window.location="/login.html";
});
$(".manageTr").click(function(){
    window.location="amanage.html";
})
$(".register").click(function(){
   var body ={
       name:$(".login").val()
   };

   API.checkUser(body, function(err,data){
       if(data){

           body={
               name:$(".login").val(),
               password:$(".password").val()
           };
           $(".signwarn").css("display", "block");
           $(".signwarn").css("color", "green");
           $(".signwarn").text("Registered!");
           $(".reg").css("display", "none");
           $(".sign").css("display", "block");
           API.addUser(body, function(err, data){});
           window.location="/login.html";
       }else{
           $(".regwarn").css("display", "block");
       }
   })
});
$(".signin").click(function(){
   var body={
       name:$(".login").val(),
       password:$(".password").val()
   } ;
    API.authorizeUser(body, function(err, data){
        if(data){
            $(".signwarn").css("display", "none");
            window.location="/";
        }else{

            $(".signwarn").css("display", "block");
        }
    });

});
$(".trnew").find(".submit").click(function(){
   var body = {
       word: $(".word").val(),
       verified: false,
       translation: $(".translationI").val()
   };

   if(body.word && body.translation) {
       API.addTranslation(body, function (err, data) {

       });
       $(".trnew").find("p").text("Your commit was successfull!");
       $(".trnew").find("p").css("color", "green");
       $(".trnew").find("p").css("display", "block");
   }else{
       $(".trnew").find("p").text("Both fields are required!");
       $(".trnew").find("p").css("color", "red");
       $(".trnew").find("p").css("display", "block");
   }

       //перенести форму, додавання, редіректи. чек
});
$(".logout").click(function(){

    var body ={
        name:"name"
    };
    console.log("log out ",body.name);
    API.logout(body, function(err, data){

    });
    window.location="/";

});
$(".cancel").click(function(){
    window.location="/";
});
$(".trnewa").find(".submit").click(function(){
    var body = {
        word: $(".word").val(),
        translation: $(".translationI").val(),
        verified: true
    };
    if(body.word && body.translation) {
        API.addTranslation(body, function (err, data) {

        });
        $(".trnewa").find("p").text("Your commit was successfull!");
        $(".trnewa").find("p").css("color", "green");
        $(".trnewa").find("p").css("display", "block");
    }else{
        $(".trnewa").find("p").text("Both fields are required!");
        $(".trnewa").find("p").css("color", "red");
        $(".trnewa").find("p").css("display", "block");
    }
});
$(".regReminder").click(function(){
    window.location="/register.html";
});
$(".goback").click(function(){
    window.location="/";
})









