const cron = require('node-cron');
const User = require('../models/user');
const Task = require("../models/task");

function usersWithEnabledNotifications() {
    return User.findBySettings({ dailyNotificationsEnabled: true });
}

function prepareEmailDailyNotification(tasks) {
    console.log(tasks)
}

usersWithEnabledNotifications().then(users => {
    users.forEach(user => {
        console.log(user);
        Task.find(user.__id).then(tasks => {
            prepareEmailDailyNotification(tasks);
        })
    })
});

console.log('Cron imported');

/*

cron.schedule('* * * * *', function() {
    console.log('running a task every minute');
});

 */
