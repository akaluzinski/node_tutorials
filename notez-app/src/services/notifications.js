const dayjs = require("dayjs");

function prepareEmailDailyNotification(tasks) {
    return tasks
        .map(task => `Since ${dayjs(task.createdAt).format('DD/MM/YYYY')} - ${task.description} ${task.completed ? '✅' : '❌'}`).join('\n');
}

module.exports = {
    prepareEmailDailyNotification
}
