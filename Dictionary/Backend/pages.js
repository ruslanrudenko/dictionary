exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Online Dictionary'
    });
};

exports.amainPage = function(req, res) {
    res.render('amainPage', {
        pageTitle: 'Online Dictionary'
    });
};
exports.umainPage = function(req, res) {
    res.render('umainPage', {
        pageTitle: 'Online Dictionary'
    });
};
exports.amanagePage = function(req, res) {
    res.render('amanagePage', {
        pageTitle: 'Editing Dictionary'
    });
};
exports.loginPage = function(req,res){
    res.render('loginPage',{
        pageTitle:'Login'
    })
};
exports.registerPage = function(req, res){
    res.render('registerPage',{
        pageTitle:'Register'
    })
};
