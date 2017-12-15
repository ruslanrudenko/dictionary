var API_URL = "http://localhost:5050";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getTranslation = function(data, callback) {
    backendPost("/api/get-translation/",data, callback);
};
exports.logout = function(data, callback){
    backendPost("/api/logout", data,callback);
};
exports.updTrans = function(data, callback){
    backendPost("/api/updTrans", data, callback);
}
exports.getList = function(data, callback){
    backendPost("/api/get-list/", data, callback)
};
exports.delTrans = function(data, callback){
    backendPost("/api/deltrans", data, callback);
};

exports.uploadTranslation = function(translation_info, callback) {
    backendPost("/api/upload-translation/", translation_info, callback);
};
exports.checkUser = function(data , callback){
    backendPost("/api/check-user/", data, callback);
};
exports.addTranslation = function(data, callback){
    backendPost("/api/add-translation", data, callback);
};
exports.addUser = function(data, callback){
    backendPost("/api/add-user", data, callback);
};
exports.authorizeUser = function(data,callback){
    backendPost("/api/authorize-user", data, callback);
};
