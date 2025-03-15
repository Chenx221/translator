require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var translateRouter = require('./routes/translate');
var docRouter = require('./routes/doc');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/doc', docRouter);
app.use('/translate', translateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

if (!process.env.TRANSLATION_SERVICES) {
    console.error('Error: TRANSLATION_SERVICES is not defined in .env file. It is possible that the .env file was not read or the format is incorrect.');
    process.exit(1);
}

let enabledServices = process.env.TRANSLATION_SERVICES.split(',');
global.services = {
    aliyunGeneral: enabledServices.includes('aliyun-general'),
    aliyunProfessional: enabledServices.includes('aliyun-professional'),
    baidu: enabledServices.includes('baidu'),
    caiyun: enabledServices.includes('caiyun'),
    deepseek: enabledServices.includes('deepseek'),
    niutrans: enabledServices.includes('niutrans'),
    tencent: enabledServices.includes('tencent'),
    volcengine: enabledServices.includes('volcengine'),
    xftransGeneral: enabledServices.includes('xftrans-general'),
    xftransNew: enabledServices.includes('xftrans-new'),
    xftransNiutrans: enabledServices.includes('xftrans-niutrans'),
    youdaoGereral: enabledServices.includes('youdao-general'),
    youdaoLLM: enabledServices.includes('youdao-llm'),
    //TODO:
    //Deepseek, gemini, openai, ollama...
    //Yandex, 腾讯交互翻译, MOJI, 金山词霸, AI Model, Google, Azure, Bing, Deepl, papago, IBM, systransoft, reverso，Amazon, LibreTranslate...
};

console.log('Configuration loaded successfully.');
console.log('DOCUMENTATION: http://localhost:' + (process.env.PORT || 3000));

module.exports = app;
