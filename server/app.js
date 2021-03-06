const Koa = require('koa');
const KoaBody = require('koa-body');
const taskRouter = require('./routers/router');
const cors = require('koa2-cors');


const app = new Koa();
app.use(KoaBody());

const HOST = '0.0.0.0';
const PORT = 3333;

app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 3000,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

let server = app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`);
});

app.use(taskRouter.routes()).use(taskRouter.allowedMethods());