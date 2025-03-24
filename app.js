import dotenv from 'dotenv';
dotenv.config();
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import translateRouter from './routes/translate.js';
import docRouter from './routes/doc.js';
import assetsRouter from './routes/assets.js';
import cookieParser from "cookie-parser";

const app = express();
const __dirname = import.meta.dirname;
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
app.use('/assets', assetsRouter);

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
    console.info('Please refer to the document below to learn how to configure .env. After completing the configuration, restart the service, and you should no longer see this message.');
}

let enabledServices = process.env.TRANSLATION_SERVICES?process.env.TRANSLATION_SERVICES.split(','):[];
global.services = {
    aliyunAI: enabledServices.includes('aliyun-ai'),
    aliyunFree: enabledServices.includes('aliyun-free'),
    aliyunGeneral: enabledServices.includes('aliyun-general'),
    aliyunProfessional: enabledServices.includes('aliyun-professional'),
    baiduAI: enabledServices.includes('baidu-ai'),
    baiduGeneral: enabledServices.includes('baidu-general'),
    caiyun: enabledServices.includes('caiyun'),
    deepseek: enabledServices.includes('deepseek'),
    gemini: enabledServices.includes('gemini'),
    niutrans: enabledServices.includes('niutrans'),
    openai: enabledServices.includes('openai'),
    tencentAI: enabledServices.includes('tencent-ai'),
    tencentGeneral: enabledServices.includes('tencent-general'),
    tencentTransmart: enabledServices.includes('tencent-transmart'),
    volcengine: enabledServices.includes('volcengine'),
    xftransGeneral: enabledServices.includes('xftrans-general'),
    xftransNew: enabledServices.includes('xftrans-new'),
    xftransNiutrans: enabledServices.includes('xftrans-niutrans'),
    youdaoGereral: enabledServices.includes('youdao-general'),
    youdaoLLM: enabledServices.includes('youdao-llm'),
    //TODO:
    //Azure, Claude, Mistral, ollama...
    //Yandex, 腾讯交互翻译, MOJI, 金山词霸, Google, Azure, Bing, Deepl, papago, IBM, systransoft, reverso，Amazon, LibreTranslate...
};

console.log('Configuration loaded successfully.');
console.log('DOCUMENTATION/DEMO: http://localhost:' + (process.env.PORT || 3000));

export default app;
