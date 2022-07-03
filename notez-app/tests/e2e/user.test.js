const request = require('supertest');
const app = require('../../src/app');
const {validUserB, validUserC, validUserA} = require("../mocks/users");
const {setupDb} = require("../mocks/helpers");

beforeEach(async () => await setupDb());

test('should sign up a new user', async () => {
    await request(app).post('/users').send(validUserB).expect(201);
});

test('should not sign up user with no credentials', async () => {
    await request(app).post('/users').send({}).expect(400);
})

test('should not sign up user with no username', async () => {
    await request(app).post('/users').send({ ...validUserC, name: undefined }).expect(400);
})

test('should not sign up user with short username', async () => {
    await request(app).post('/users').send({ ...validUserC, name: 'xd'  }).expect(400);
})

test('should not sign up user with no password', async () => {
    await request(app).post('/users').send({ ...validUserC, password: 'xd'  }).expect(400);
})

test('should not sign up user with short password', async () => {
    await request(app).post('/users').send({ ...validUserC, password: '          xd     '  }).expect(400);
})

test('should not sign up user with duplicated email', async () => {
    await request(app).post('/users').send({ ...validUserC, email: validUserA.email }).expect(400);
})

test('should not sign up user with invalid email', async () => {
    await request(app).post('/users').send({ ...validUserC, email: 'not-an-email' }).expect(400);
})
