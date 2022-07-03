const cron = require('node-cron');
const User = require('../models/user');
const Task = require('../models/task');
const {prepareEmailDailyNotification} = require('./notifications');
const {sendEmail} = require('./mails');
const {log} = require("./log");

const scheduledEnabled = false;

function usersWithEnabledNotifications() {
    return User.findBySettings({ dailyNotificationsEnabled: true });
}

function sendDailyNotifications() {
    usersWithEnabledNotifications().then(users => {
        users.forEach(user => {
            console.log(user.email + ' ' + user._id + ' has enabled notifications.');
            Task.find(user._id).then(tasks => {
                const emailBody = prepareEmailDailyNotification(tasks);
                sendEmail(user.email, 'Notification', emailBody).then(result => {
                    console.log(result);
                    console.log('Email sent to ' + user.email)
                });
            })
        })
    });
}

if (scheduledEnabled) {
    cron.schedule('* * * * *', () => {
        log('Scheduler iteration starts')
        sendDailyNotifications();
        log('Scheduler iteration ends');
    });
} else {
    log('Notification scheduler is disabled.');
}

