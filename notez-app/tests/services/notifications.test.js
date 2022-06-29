const {prepareEmailDailyNotification} = require("../../src/services/notifications");

const createdAt = new Date(2021,2, 2);
const completedTask = { completed: true, createdAt, description: 'Some task' };

test('should prepare empty message for no notification', () => {
    expect(prepareEmailDailyNotification([])).toEqual("");
});

test('should prepare message for completed task', () => {
    expect(prepareEmailDailyNotification([ completedTask ])).toEqual("Since 02/03/2021 - Some task ✅");
});

test('should prepare message for not completed task', () => {
    expect(prepareEmailDailyNotification([ {...completedTask, completed: false }])).toEqual("Since 02/03/2021 - Some task ❌");
});
