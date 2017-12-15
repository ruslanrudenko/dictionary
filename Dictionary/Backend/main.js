var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')






function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');
    app.use(cookieParser());


    //Налаштування URL за якими буде відповідати сервер
    //Отримання списку піц
    app.post('/api/get-translation/', api.getTranslation);
    app.post('/api/upload-translation/', api.uploadTranslation);
    app.post('/api/check-user/', api.checkUser);
    app.post('/api/add-user/', api.addUser);
    app.post('/api/authorize-user',api.authorizeUser);
    app.post('/api/logout', api.delSession);
    app.post('/api/get-list', api.getList);
    app.post('/api/deltrans', api.deltrans);
    app.post('/api/add-translation', api.addTranslation);

    //app.post('/logout')

    //Сторінки
    //Головна сторінка
    app.get('/', api.checkGuest,pages.mainPage);
    app.get('/index.html',pages.mainPage);
    app.get('/login.html', pages.loginPage);
    app.get('/register.html', pages.registerPage);

    //Сторінка замовлення
    app.get('/u.html', api.checkU, pages.umainPage);
    app.get('/a.html', api.checkA,pages.amainPage);
    app.get('/amanage.html', api.checkA, pages.amanagePage);


    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/database');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("connected to db");
    });



// initialize express-session to allow us track the logged-in user across sessions



    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}
// set a cookie


exports.startServer = startServer;