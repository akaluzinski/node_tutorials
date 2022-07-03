const request = require('supertest');
const app = require('../../src/app');

test('should sign up a new user', async () => {
    await request(app).post('/users').send({
       name: 'John',
       email: 'john@testowalnyuser.com',
       password: 'SecretPasseord888!'
    }).expect(201);
});
