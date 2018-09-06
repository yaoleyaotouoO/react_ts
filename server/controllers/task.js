const fs = require('fs');
var path = require('path');

const filePath = path.join(__dirname, '../data/task.json');

class TaskController {
    async fetchTaskList() {
        let data = fs.readFileSync(filePath);
        data = JSON.parse(data);
        
        return data;
    }

    async deleteTask({ taskId }) {
        let data = fs.readFileSync(filePath);
        data = JSON.parse(data);
        if (!data.length) {
            return [];
        }

        data = data.filter(x => x.id !== taskId);
        fs.writeFileSync(filePath, JSON.stringify(data));

        return data;
    }

    async changeTaskStatus({ taskId, value }) {
        let data = fs.readFileSync(filePath);
        data = JSON.parse(data);
        if (!data.length) {
            return [];
        }

        data = data.map(x => {
            if (x.id === taskId) {
                x.isComplete = value;
            }

            return x;
        })
        fs.writeFileSync(filePath, JSON.stringify(data));

        return data;
    }

    async addTask({ name }) {
        let data = fs.readFileSync(filePath);
        data = JSON.parse(data);
        let maxId = data.length ? data.sort().reverse()[0].id : 0;
        maxId = ++maxId;

        let task = {
            id: maxId,
            name,
            isComplete: false
        }

        data.push(task);
        fs.writeFileSync(filePath, JSON.stringify(data));

        return data;
    }
}


module.exports = TaskController;