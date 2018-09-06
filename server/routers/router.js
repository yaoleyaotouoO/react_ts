const Router = require('koa-router');
const TaskController = require('../controllers/task');

const taskController = new TaskController();
const taskRouter = new Router({ prefix: '/task' });


taskRouter
    .get('/fetchTaskList', async (ctx) => {
        const data = await taskController.fetchTaskList();
        ctx.body = data;
    })
    .post('/deleteTask', async (ctx) => {
        const data = await taskController.deleteTask(ctx.request.body);
        ctx.body = data;
    })
    .post('/changeTaskStatus', async (ctx) => {
        const data = await taskController.changeTaskStatus(ctx.request.body);
        ctx.body = data;
    })
    .post('/addTask', async (ctx) => {
        const data = await taskController.addTask(ctx.request.body);
        ctx.body = data;
    })

module.exports = taskRouter;